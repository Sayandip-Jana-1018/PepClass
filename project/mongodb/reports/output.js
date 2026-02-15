// ================================
// OUTPUT REPORT - QUICK VIEW
// ================================

db = db.getSiblingDB("mongoDB");

print("\n===== ALL USERS =====");
const users = db.users.find().toArray();
if (users.length === 0) print("   ⚠ No users");
else printjson(users);

print("\n===== ALL COURSES =====");
const courses = db.courses.find().toArray();
if (courses.length === 0) print("   ⚠ No courses");
else printjson(courses);

print("\n===== ALL CATEGORIES =====");
const categories = db.categories.find().toArray();
if (categories.length === 0) print("   ⚠ No categories");
else printjson(categories);

print("\n===== ALL LESSONS =====");
const lessons = db.lessons.find().toArray();
if (lessons.length === 0) print("   ⚠ No lessons");
else printjson(lessons);

print("\n===== ALL ENROLLMENTS =====");
const enrollments = db.enrollments.find().toArray();
if (enrollments.length === 0) print("   ⚠ No enrollments");
else printjson(enrollments);

print("\n===== ALL PAYMENTS =====");
const payments = db.payments.find().toArray();
if (payments.length === 0) print("   ⚠ No payments");
else printjson(payments);

print("\n===== ALL REVIEWS =====");
const reviews = db.reviews.find().toArray();
if (reviews.length === 0) print("   ⚠ No reviews");
else printjson(reviews);


// TOP COURSES
print("\n===== TOP RATED COURSES =====");

const topCourses = db.courses.aggregate([
  { $sort: { rating: -1 } },
  { $limit: 3 }
]).toArray();

if (topCourses.length === 0) print("   ⚠ No courses");
else printjson(topCourses);


// REVENUE
print("\n===== REVENUE PER COURSE =====");

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
      revenue: { $sum: "$pay.amount" }
    }
  }
]).toArray();

if (revenueData.length === 0) print("   ⚠ No revenue data");
else printjson(revenueData);


// INSTRUCTOR EARNINGS
print("\n===== INSTRUCTOR EARNINGS =====");

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

if (instructorEarnings.length === 0) print("   ⚠ No instructor earnings data");
else printjson(instructorEarnings);


print("\n===== END OF REPORT =====");
