// ================================
// MONGO DB - MASTER DEMO FILE
// ================================

db = db.getSiblingDB("mongoDB");

print("\n======================================");
print("   MONGO DB - E LEARNING DATABASE   ");
print("   Author: Sayan                    ");
print("======================================\n");


// --------------------------------------
// DATABASE INFO
// --------------------------------------

print("Database Name: " + db.getName());
print("\nCollections:");
printjson(db.getCollectionNames());


// --------------------------------------
// COLLECTION SUMMARY (Document Counts)
// --------------------------------------

print("\n========== COLLECTION SUMMARY ==========");
const collections = ["users", "categories", "courses", "lessons", "enrollments", "payments", "reviews"];
collections.forEach(function (col) {
  const count = db.getCollection(col).countDocuments();
  print("   " + col + ": " + count + " document(s)");
});


// --------------------------------------
// USERS
// --------------------------------------

print("\n========== USERS ==========");
const users = db.users.find().toArray();
if (users.length === 0) {
  print("   ⚠ No users found");
} else {
  printjson(users);
}


// --------------------------------------
// COURSES
// --------------------------------------

print("\n========== COURSES ==========");
const courses = db.courses.find().toArray();
if (courses.length === 0) {
  print("   ⚠ No courses found");
} else {
  printjson(courses);
}


// --------------------------------------
// CATEGORIES
// --------------------------------------

print("\n========== CATEGORIES ==========");
const categories = db.categories.find().toArray();
if (categories.length === 0) {
  print("   ⚠ No categories found");
} else {
  printjson(categories);
}


// --------------------------------------
// LESSONS
// --------------------------------------

print("\n========== LESSONS ==========");
const lessons = db.lessons.find().toArray();
if (lessons.length === 0) {
  print("   ⚠ No lessons found");
} else {
  printjson(lessons);
}


// --------------------------------------
// ENROLLMENTS
// --------------------------------------

print("\n========== ENROLLMENTS ==========");
const enrollments = db.enrollments.find().toArray();
if (enrollments.length === 0) {
  print("   ⚠ No enrollments found");
} else {
  printjson(enrollments);
}


// --------------------------------------
// PAYMENTS
// --------------------------------------

print("\n========== PAYMENTS ==========");
const payments = db.payments.find().toArray();
if (payments.length === 0) {
  print("   ⚠ No payments found");
} else {
  printjson(payments);
}


// --------------------------------------
// REVIEWS
// --------------------------------------

print("\n========== REVIEWS ==========");
const reviews = db.reviews.find().toArray();
if (reviews.length === 0) {
  print("   ⚠ No reviews found");
} else {
  printjson(reviews);
}


// --------------------------------------
// ANALYTICS: TOP COURSES
// --------------------------------------

print("\n========== TOP RATED COURSES ==========");

const topCourses = db.courses.aggregate([
  { $sort: { rating: -1 } },
  { $limit: 3 },
  { $project: { title: 1, rating: 1, totalStudents: 1, price: 1 } }
]).toArray();

if (topCourses.length === 0) {
  print("   ⚠ No courses to rank");
} else {
  printjson(topCourses);
}


// --------------------------------------
// ANALYTICS: REVENUE PER COURSE
// --------------------------------------

print("\n========== REVENUE PER COURSE ==========");

const revenueData = db.enrollments.aggregate([
  {
    $lookup: {
      from: "payments",
      localField: "paymentId",
      foreignField: "_id",
      as: "pay"
    }
  },
  { $unwind: "$pay" },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course"
    }
  },
  { $unwind: "$course" },
  {
    $group: {
      _id: "$courseId",
      courseName: { $first: "$course.title" },
      revenue: { $sum: "$pay.amount" },
      enrollments: { $sum: 1 }
    }
  },
  { $sort: { revenue: -1 } }
]).toArray();

if (revenueData.length === 0) {
  print("   ⚠ No revenue data");
} else {
  printjson(revenueData);
}


// --------------------------------------
// ANALYTICS: INSTRUCTOR EARNINGS
// --------------------------------------

print("\n========== INSTRUCTOR EARNINGS ==========");

const instructorEarnings = db.courses.aggregate([
  {
    $lookup: {
      from: "enrollments",
      localField: "_id",
      foreignField: "courseId",
      as: "enrolls"
    }
  },
  {
    $lookup: {
      from: "payments",
      localField: "enrolls.paymentId",
      foreignField: "_id",
      as: "payments"
    }
  },
  { $unwind: { path: "$payments", preserveNullAndEmptyArrays: false } },
  {
    $group: {
      _id: "$instructorId",
      earnings: { $sum: "$payments.amount" }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "instructor"
    }
  },
  { $unwind: "$instructor" },
  {
    $project: {
      instructorName: "$instructor.name",
      earnings: 1
    }
  }
]).toArray();

if (instructorEarnings.length === 0) {
  print("   ⚠ No instructor earnings data");
} else {
  printjson(instructorEarnings);
}


// --------------------------------------
// PERFORMANCE TEST
// --------------------------------------

print("\n========== PERFORMANCE TEST ==========");

const userForTest = db.users.findOne({ role: "instructor" });
if (userForTest) {
  print("Testing index scan on email: " + userForTest.email);
  const explainResult = db.users.find({ email: userForTest.email })
    .explain("executionStats");
  print("   Execution Time: " + explainResult.executionStats.executionTimeMillis + "ms");
  print("   Documents Examined: " + explainResult.executionStats.totalDocsExamined);
  print("   Keys Examined: " + explainResult.executionStats.totalKeysExamined);
  print("   Index Used: " + (explainResult.executionStats.totalKeysExamined > 0 ? "✔ YES (IXSCAN)" : "❌ NO (COLLSCAN)"));
} else {
  print("   ⚠ No users to test performance against");
}


// --------------------------------------
// VALIDATION CHECK
// --------------------------------------

print("\n========== VALIDATION CHECK ==========");

const invalidReviews = db.reviews.find({
  $or: [
    { rating: { $gt: 5 } },
    { rating: { $lt: 1 } }
  ]
}).toArray();

if (invalidReviews.length === 0) {
  print("   ✔ All reviews are valid (rating between 1-5)");
} else {
  print("   ❌ Invalid reviews found:");
  printjson(invalidReviews);
}

// Check for orphan enrollments (enrollment pointing to deleted user/course)
const orphanEnrollments = db.enrollments.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "studentId",
      foreignField: "_id",
      as: "student"
    }
  },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course"
    }
  },
  {
    $match: {
      $or: [
        { student: { $size: 0 } },
        { course: { $size: 0 } }
      ]
    }
  }
]).toArray();

if (orphanEnrollments.length === 0) {
  print("   ✔ No orphan enrollments (data integrity OK)");
} else {
  print("   ❌ Found " + orphanEnrollments.length + " orphan enrollment(s)");
}


// --------------------------------------
// END
// --------------------------------------

print("\n======================================");
print("      END OF PROJECT DEMO REPORT      ");
print("======================================\n");
