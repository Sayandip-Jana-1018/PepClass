const connectDB = require("./db");

async function addReview(studentEmail, courseTitle, rating, comment) {
  const db = await connectDB();

  // Validate inputs
  studentEmail = (studentEmail || "").trim().toLowerCase();
  courseTitle = (courseTitle || "").trim();
  comment = (comment || "").trim();
  const numRating = Number(rating);

  if (!studentEmail) {
    console.log("❌ Student email cannot be empty");
    return;
  }

  if (!courseTitle) {
    console.log("❌ Course title cannot be empty");
    return;
  }

  if (isNaN(numRating) || !Number.isInteger(numRating)) {
    console.log("❌ Rating must be a whole number (1-5)");
    return;
  }

  if (numRating < 1 || numRating > 5) {
    console.log("❌ Rating must be between 1 and 5");
    return;
  }

  if (!comment) {
    console.log("❌ Comment cannot be empty");
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
  const course = await db.collection("courses").findOne({ title: courseTitle });

  if (!course) {
    console.log("❌ Course not found: " + courseTitle);
    return;
  }

  // Check student is enrolled in this course
  const enrollment = await db.collection("enrollments").findOne({
    studentId: student._id,
    courseId: course._id
  });

  if (!enrollment) {
    console.log("❌ Student is not enrolled in '" + courseTitle + "'");
    return;
  }

  // Check duplicate review (same student + same course)
  const existingReview = await db.collection("reviews").findOne({
    studentId: student._id,
    courseId: course._id
  });

  if (existingReview) {
    console.log("⚠ Student has already reviewed this course. Updating review...");
    await db.collection("reviews").updateOne(
      { _id: existingReview._id },
      {
        $set: {
          rating: numRating,
          comment,
          updatedAt: new Date()
        }
      }
    );
    console.log("✅ Review updated successfully");

    // Update course average rating
    await updateCourseRating(db, course._id);
    return;
  }

  await db.collection("reviews").insertOne({
    courseId: course._id,
    studentId: student._id,
    rating: numRating,
    comment,
    createdAt: new Date()
  });

  console.log("✅ Review added successfully");

  // Update course average rating
  await updateCourseRating(db, course._id);
}

// View all reviews with student names and course names
async function viewReviews() {
  const db = await connectDB();

  const reviews = await db.collection("reviews").aggregate([
    {
      $lookup: {
        from: "users",
        localField: "studentId",
        foreignField: "_id",
        as: "student"
      }
    },
    { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course"
      }
    },
    { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        Student: "$student.name",
        Course: "$course.title",
        Rating: "$rating",
        Comment: "$comment",
        Date: "$createdAt"
      }
    }
  ]).toArray();

  if (reviews.length === 0) {
    console.log("⚠ No reviews found");
    return;
  }

  console.table(reviews);
}

// Helper: recalculate average rating for a course
async function updateCourseRating(db, courseId) {
  const pipeline = [
    { $match: { courseId } },
    { $group: { _id: null, avgRating: { $avg: "$rating" } } }
  ];

  const result = await db.collection("reviews").aggregate(pipeline).toArray();

  if (result.length > 0) {
    const avg = Math.round(result[0].avgRating * 10) / 10;
    await db.collection("courses").updateOne(
      { _id: courseId },
      { $set: { rating: avg } }
    );
    console.log("   📊 Course rating updated to " + avg);
  }
}

module.exports = { addReview, viewReviews };
