const connectDB = require("./db");

async function addCourse(title, description, price, level) {
  const db = await connectDB();

  // Validate inputs
  title = (title || "").trim();
  description = (description || "").trim();
  const numPrice = Number(price);
  level = (level || "").trim().toLowerCase();

  if (!title) {
    console.log("❌ Course title cannot be empty");
    return;
  }

  if (!description) {
    console.log("❌ Course description cannot be empty");
    return;
  }

  if (isNaN(numPrice) || numPrice <= 0) {
    console.log("❌ Price must be a positive number");
    return;
  }

  const validLevels = ["beginner", "intermediate", "advanced"];
  if (!validLevels.includes(level)) {
    console.log("❌ Level must be: beginner, intermediate, or advanced");
    return;
  }

  // Check duplicate course
  const existing = await db.collection("courses").findOne({ title });
  if (existing) {
    console.log("❌ Course '" + title + "' already exists");
    return;
  }

  // Get first instructor
  const instructor = await db
    .collection("users")
    .findOne({ role: "instructor" });

  if (!instructor) {
    console.log("❌ No instructor found. Please add an instructor first.");
    return;
  }

  // Get any category (default first one)
  const category = await db.collection("categories").findOne();

  if (!category) {
    console.log("❌ No category found. Please run bulk data seeder first.");
    return;
  }

  await db.collection("courses").insertOne({
    title,
    description,
    price: numPrice,
    instructorId: instructor._id,
    categoryId: category._id,
    rating: 0,
    totalStudents: 0,
    level,
    createdAt: new Date()
  });

  console.log("✅ Course '" + title + "' added successfully (Instructor: " + instructor.name + ", Level: " + level + ")");
}

async function viewCourses() {
  const db = await connectDB();

  const courses = await db.collection("courses").find().toArray();

  if (courses.length === 0) {
    console.log("⚠ No courses found");
    return;
  }

  console.table(
    courses.map(c => ({
      Title: c.title,
      Description: c.description,
      Price: "₹" + c.price,
      Rating: c.rating,
      Students: c.totalStudents,
      Level: c.level
    }))
  );
}

async function deleteCourse(title) {
  const db = await connectDB();

  title = (title || "").trim();

  if (!title) {
    console.log("❌ Course title cannot be empty");
    return;
  }

  const course = await db.collection("courses").findOne({ title });

  if (!course) {
    console.log("❌ Course not found: " + title);
    const allCourses = await db.collection("courses").find({}, { projection: { title: 1 } }).toArray();
    if (allCourses.length > 0) {
      console.log("   Available courses:");
      allCourses.forEach(c => console.log("   - " + c.title));
    }
    return;
  }

  // CASCADE: Delete all related data

  // 1. Find enrollments for this course
  const enrollments = await db.collection("enrollments")
    .find({ courseId: course._id })
    .toArray();

  // 2. Delete payments linked to enrollments
  const paymentIds = enrollments.map(e => e.paymentId);
  if (paymentIds.length > 0) {
    await db.collection("payments").deleteMany({ _id: { $in: paymentIds } });
    console.log("   🗑 Deleted " + paymentIds.length + " payment(s)");
  }

  // 3. Delete enrollments for this course
  const enrollResult = await db.collection("enrollments").deleteMany({ courseId: course._id });
  if (enrollResult.deletedCount > 0) {
    console.log("   🗑 Deleted " + enrollResult.deletedCount + " enrollment(s)");
  }

  // 4. Delete reviews for this course
  const reviewResult = await db.collection("reviews").deleteMany({ courseId: course._id });
  if (reviewResult.deletedCount > 0) {
    console.log("   🗑 Deleted " + reviewResult.deletedCount + " review(s)");
  }

  // 5. Delete lessons for this course
  const lessonResult = await db.collection("lessons").deleteMany({ courseId: course._id });
  if (lessonResult.deletedCount > 0) {
    console.log("   🗑 Deleted " + lessonResult.deletedCount + " lesson(s)");
  }

  // 6. Delete the course
  await db.collection("courses").deleteOne({ _id: course._id });
  console.log("✅ Course '" + title + "' deleted with all related data");
}

module.exports = {
  addCourse,
  viewCourses,
  deleteCourse
};
