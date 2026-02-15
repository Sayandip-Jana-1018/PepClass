db = db.getSiblingDB("mongoDB");


// USERS
db.users.insertMany([
  {
    name: "Sayan",
    email: "sayan@gmail.com",
    password: "12345",
    role: "instructor",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "Rahul",
    email: "rahul@gmail.com",
    password: "12345",
    role: "student",
    isVerified: true,
    createdAt: new Date()
  }
]);


// CATEGORY
const cat = db.categories.insertOne({
  name: "Web Development",
  description: "MERN Stack"
});


// GET USERS
const instructor = db.users.findOne({ role: "instructor" });
const student = db.users.findOne({ role: "student" });


// COURSE
const course = db.courses.insertOne({
  title: "Full Stack MERN",
  description: "From Zero to Hero",
  price: 4999,
  instructorId: instructor._id,
  categoryId: cat.insertedId,
  rating: 4.8,
  totalStudents: 0,
  level: "beginner"
});


// PAYMENT
const pay = db.payments.insertOne({
  studentId: student._id,
  amount: 4999,
  paymentStatus: "success",
  transactionId: "TXN001",
  createdAt: new Date()
});


// ENROLLMENT
db.enrollments.insertOne({
  studentId: student._id,
  courseId: course.insertedId,
  enrolledAt: new Date(),
  paymentId: pay.insertedId
});


// LESSON
db.lessons.insertOne({
  courseId: course.insertedId,
  title: "Introduction to MERN",
  videoUrl: "https://example.com/video1",
  duration: 15,
  order: 1
});


// REVIEW
db.reviews.insertOne({
  courseId: course.insertedId,
  studentId: student._id,
  rating: NumberInt(5),
  comment: "Excellent course, very helpful",
  createdAt: new Date()
});


print("Sample data inserted (with lesson & review)");
