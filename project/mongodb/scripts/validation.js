db = db.getSiblingDB("mongoDB");

print("\n========== VALIDATION TESTS ==========\n");


// -------- TEST 1: DUPLICATE EMAIL --------
print("TEST 1: Duplicate Email Prevention");

// Use an email that exists in the seeded data
const existingUser = db.users.findOne();
if (existingUser) {
  try {
    db.users.insertOne({
      name: "Fake User",
      email: existingUser.email,
      password: "111",
      role: "student"
    });
    print("   ❌ FAIL — Duplicate email was inserted (index may be missing)");
    // Clean up
    db.users.deleteOne({ name: "Fake User", email: existingUser.email });
  } catch (e) {
    print("   ✔ PASS — Duplicate email blocked by unique index");
  }
} else {
  print("   ⚠ SKIP — No users found to test against");
}


// -------- TEST 2: INVALID RATING (> 5) --------
print("\nTEST 2: Invalid Rating (> 5)");
try {
  db.reviews.insertOne({
    courseId: ObjectId(),
    studentId: ObjectId(),
    rating: 10,
    comment: "Test",
    createdAt: new Date()
  });
  print("   ❌ FAIL — Rating 10 was accepted (schema validation missing)");
  // Clean up
  db.reviews.deleteOne({ rating: 10 });
} catch (e) {
  print("   ✔ PASS — Rating 10 blocked by schema validation");
}


// -------- TEST 3: INVALID RATING (< 1) --------
print("\nTEST 3: Invalid Rating (< 1)");
try {
  db.reviews.insertOne({
    courseId: ObjectId(),
    studentId: ObjectId(),
    rating: 0,
    comment: "Test",
    createdAt: new Date()
  });
  print("   ❌ FAIL — Rating 0 was accepted (schema validation missing)");
  // Clean up
  db.reviews.deleteOne({ rating: 0 });
} catch (e) {
  print("   ✔ PASS — Rating 0 blocked by schema validation");
}


// -------- TEST 4: INVALID RATING (negative) --------
print("\nTEST 4: Invalid Rating (negative)");
try {
  db.reviews.insertOne({
    courseId: ObjectId(),
    studentId: ObjectId(),
    rating: -3,
    comment: "Test",
    createdAt: new Date()
  });
  print("   ❌ FAIL — Negative rating was accepted");
  db.reviews.deleteOne({ rating: -3 });
} catch (e) {
  print("   ✔ PASS — Negative rating blocked by schema validation");
}


// -------- TEST 5: DUPLICATE ENROLLMENT --------
print("\nTEST 5: Duplicate Enrollment Prevention");
const enrollment = db.enrollments.findOne();
if (enrollment) {
  try {
    db.enrollments.insertOne({
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      enrolledAt: new Date()
    });
    print("   ❌ FAIL — Duplicate enrollment was inserted");
    // Clean up
    db.enrollments.deleteOne({
      studentId: enrollment.studentId,
      courseId: enrollment.courseId,
      paymentId: { $exists: false }
    });
  } catch (e) {
    print("   ✔ PASS — Duplicate enrollment blocked by compound unique index");
  }
} else {
  print("   ⚠ SKIP — No enrollments found to test against");
}


print("\n========== VALIDATION TESTS COMPLETE ==========\n");
