db = db.getSiblingDB("mongoDB");

print("\n====== REALISTIC DATA SEEDER STARTED ======\n");


// ----------- CLEAR OLD DATA (OPTIONAL) -----------
db.users.deleteMany({});
db.courses.deleteMany({});
db.categories.deleteMany({});
db.lessons.deleteMany({});
db.enrollments.deleteMany({});
db.reviews.deleteMany({});
db.payments.deleteMany({});


// ----------- REALISTIC NAMES -----------

const studentNames = [
  "Rahul Sharma", "Anjali Verma", "Rohan Gupta", "Sneha Kapoor",
  "Arjun Mehta", "Priya Singh", "Vikram Rao", "Neha Joshi",
  "Karan Malhotra", "Isha Reddy"
];

const instructorNames = [
  "Sayan Jana", "Amit Kulkarni"
];

const categoriesData = [
  { name: "Web Development", description: "Frontend & Backend" },
  { name: "Data Science", description: "ML & AI" },
  { name: "DevOps", description: "CI/CD & Cloud" }
];


// ----------- INSERT CATEGORIES -----------

const categories = db.categories.insertMany(categoriesData);
const categoryIds = Object.values(categories.insertedIds);


// ----------- INSERT INSTRUCTORS -----------

let instructors = instructorNames.map((name, i) => ({
  name,
  email: name.toLowerCase().replace(" ", "") + "@mail.com",
  password: "12345",
  role: "instructor",
  isVerified: true,
  createdAt: new Date()
}));

const instructorResult = db.users.insertMany(instructors);
const instructorIds = Object.values(instructorResult.insertedIds);


// ----------- INSERT COURSES -----------

const coursesData = [
  { title: "Full Stack MERN", price: 5999, level: "beginner" },
  { title: "Machine Learning Bootcamp", price: 7999, level: "intermediate" },
  { title: "Docker & Kubernetes", price: 4999, level: "advanced" }
];

let courses = [];

coursesData.forEach((course, index) => {
  const inserted = db.courses.insertOne({
    title: course.title,
    description: "Complete course on " + course.title,
    price: course.price,
    instructorId: instructorIds[index % instructorIds.length],
    categoryId: categoryIds[index],
    rating: 4.5,
    totalStudents: 0,
    level: course.level
  });
  courses.push(inserted.insertedId);
});


// ----------- INSERT LESSONS -----------

courses.forEach(courseId => {
  for (let i = 1; i <= 3; i++) {
    db.lessons.insertOne({
      courseId,
      title: "Lesson " + i,
      videoUrl: "https://example.com/video" + i,
      duration: 20 + i * 5,
      order: i
    });
  }
});


// ----------- INSERT STUDENTS -----------

let students = studentNames.map(name => ({
  name,
  email: name.toLowerCase().replace(" ", "") + "@mail.com",
  password: "12345",
  role: "student",
  isVerified: true,
  createdAt: new Date()
}));

const studentResult = db.users.insertMany(students);
const studentIds = Object.values(studentResult.insertedIds);


// ----------- ENROLL + PAYMENT + REVIEW -----------

studentIds.forEach(studentId => {

  const randomCourse = courses[Math.floor(Math.random() * courses.length)];
  const course = db.courses.findOne({ _id: randomCourse });

  const payment = db.payments.insertOne({
    studentId,
    amount: course.price,
    paymentStatus: "success",
    transactionId: "TXN" + Math.floor(Math.random() * 100000),
    createdAt: new Date()
  });

  db.enrollments.insertOne({
    studentId,
    courseId: randomCourse,
    enrolledAt: new Date(),
    paymentId: payment.insertedId
  });

  const rating = NumberInt(Math.floor(Math.random() * 3) + 3);

  db.reviews.insertOne({
    courseId: randomCourse,
    studentId,
    rating,
    comment: "Very informative and structured course.",
    createdAt: new Date()
  });

});


// ----------- UPDATE COURSE STUDENT COUNT -----------

courses.forEach(courseId => {
  const count = db.enrollments.countDocuments({ courseId });
  db.courses.updateOne(
    { _id: courseId },
    { $set: { totalStudents: count } }
  );
});


print("\n====== REALISTIC DATA SEEDING COMPLETED ======\n");
