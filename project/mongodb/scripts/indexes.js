db = db.getSiblingDB("mongoDB");

// Unique email
db.users.createIndex(
  { email: 1 },
  { unique: true }
);

// Student + Course unique
db.enrollments.createIndex(
  { studentId: 1, courseId: 1 },
  { unique: true }
);

print("Indexes created");
