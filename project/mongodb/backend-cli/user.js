const connectDB = require("./db");

async function addUser(name, email, role) {
  const db = await connectDB();

  // Validate inputs
  name = (name || "").trim();
  email = (email || "").trim().toLowerCase();
  role = (role || "").trim().toLowerCase();

  if (!name) {
    console.log("❌ Name cannot be empty");
    return;
  }

  if (!email || !email.includes("@") || !email.includes(".")) {
    console.log("❌ Invalid email format");
    return;
  }

  if (role !== "student" && role !== "instructor") {
    console.log("❌ Role must be 'student' or 'instructor'");
    return;
  }

  const exists = await db.collection("users").findOne({ email });

  if (exists) {
    console.log("❌ Email already exists");
    return;
  }

  await db.collection("users").insertOne({
    name,
    email,
    password: "12345",
    role,
    isVerified: true,
    createdAt: new Date()
  });

  console.log("✅ User added successfully");
}

async function viewUsers() {
  const db = await connectDB();

  const users = await db.collection("users").find().toArray();

  if (users.length === 0) {
    console.log("⚠ No users found");
    return;
  }

  console.table(
    users.map(u => ({
      Name: u.name,
      Email: u.email,
      Role: u.role,
      Verified: u.isVerified,
      Created: u.createdAt
    }))
  );
}

async function deleteUser(email) {
  const db = await connectDB();

  email = (email || "").trim().toLowerCase();

  if (!email) {
    console.log("❌ Email cannot be empty");
    return;
  }

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    console.log("❌ User not found with email: " + email);
    return;
  }

  // CASCADE: Delete all related data

  // 1. Find enrollments of this user
  const enrollments = await db.collection("enrollments")
    .find({ studentId: user._id })
    .toArray();

  // 2. Delete payments linked to this user
  const paymentIds = enrollments.map(e => e.paymentId);
  if (paymentIds.length > 0) {
    await db.collection("payments").deleteMany({ _id: { $in: paymentIds } });
    console.log("   🗑 Deleted " + paymentIds.length + " payment(s)");
  }

  // 3. Delete enrollments of this user
  const enrollResult = await db.collection("enrollments").deleteMany({ studentId: user._id });
  if (enrollResult.deletedCount > 0) {
    console.log("   🗑 Deleted " + enrollResult.deletedCount + " enrollment(s)");
  }

  // 4. Update totalStudents count on affected courses
  for (const enrollment of enrollments) {
    await db.collection("courses").updateOne(
      { _id: enrollment.courseId },
      { $inc: { totalStudents: -1 } }
    );
  }

  // 5. Delete reviews by this user
  const reviewResult = await db.collection("reviews").deleteMany({ studentId: user._id });
  if (reviewResult.deletedCount > 0) {
    console.log("   🗑 Deleted " + reviewResult.deletedCount + " review(s)");
  }

  // 6. If instructor, delete their courses and cascade
  if (user.role === "instructor") {
    const courses = await db.collection("courses")
      .find({ instructorId: user._id })
      .toArray();

    for (const course of courses) {
      // Delete enrollments for this course
      const courseEnrollments = await db.collection("enrollments")
        .find({ courseId: course._id })
        .toArray();

      const coursePmtIds = courseEnrollments.map(e => e.paymentId);
      if (coursePmtIds.length > 0) {
        await db.collection("payments").deleteMany({ _id: { $in: coursePmtIds } });
      }

      await db.collection("enrollments").deleteMany({ courseId: course._id });
      await db.collection("reviews").deleteMany({ courseId: course._id });
      await db.collection("lessons").deleteMany({ courseId: course._id });
    }

    const courseResult = await db.collection("courses").deleteMany({ instructorId: user._id });
    if (courseResult.deletedCount > 0) {
      console.log("   🗑 Deleted " + courseResult.deletedCount + " course(s) by this instructor");
    }
  }

  // 7. Finally delete the user
  await db.collection("users").deleteOne({ _id: user._id });
  console.log("✅ User '" + user.name + "' deleted with all related data");
}

module.exports = { addUser, viewUsers, deleteUser };
