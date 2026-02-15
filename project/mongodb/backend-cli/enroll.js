const connectDB = require("./db");

async function enrollStudent(studentEmail, courseTitle) {
  const db = await connectDB();

  // Validate inputs
  studentEmail = (studentEmail || "").trim().toLowerCase();
  courseTitle = (courseTitle || "").trim();

  if (!studentEmail) {
    console.log("❌ Student email cannot be empty");
    return;
  }

  if (!courseTitle) {
    console.log("❌ Course title cannot be empty");
    return;
  }

  // Find student
  const student = await db.collection("users").findOne({
    email: studentEmail,
    role: "student"
  });

  if (!student) {
    console.log("❌ Student not found with email: " + studentEmail);
    return;
  }

  // Find course
  const course = await db.collection("courses").findOne({
    title: courseTitle
  });

  if (!course) {
    console.log("❌ Course not found: " + courseTitle);
    // Show available courses
    const allCourses = await db.collection("courses").find({}, { projection: { title: 1 } }).toArray();
    if (allCourses.length > 0) {
      console.log("   Available courses:");
      allCourses.forEach(c => console.log("   - " + c.title));
    }
    return;
  }

  // Check duplicate enrollment
  const already = await db.collection("enrollments").findOne({
    studentId: student._id,
    courseId: course._id
  });

  if (already) {
    console.log("⚠ Student is already enrolled in '" + courseTitle + "'");
    return;
  }

  try {
    // Create payment first
    const payment = await db.collection("payments").insertOne({
      studentId: student._id,
      amount: course.price,
      paymentStatus: "success",
      transactionId: "TXN" + Date.now(),
      createdAt: new Date()
    });

    // Create enrollment
    await db.collection("enrollments").insertOne({
      studentId: student._id,
      courseId: course._id,
      enrolledAt: new Date(),
      paymentId: payment.insertedId
    });

    // Update student count on course
    await db.collection("courses").updateOne(
      { _id: course._id },
      { $inc: { totalStudents: 1 } }
    );

    console.log("✅ " + student.name + " enrolled in '" + courseTitle + "' (Payment: ₹" + course.price + ")");

  } catch (err) {
    console.log("❌ Enrollment failed: " + err.message);
    // Attempt to rollback payment if enrollment failed
    console.log("   Attempting to rollback...");
    await db.collection("payments").deleteMany({
      studentId: student._id,
      createdAt: { $gte: new Date(Date.now() - 5000) }
    });
    console.log("   Rollback completed");
  }
}

module.exports = enrollStudent;
