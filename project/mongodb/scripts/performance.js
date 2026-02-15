db = db.getSiblingDB("mongoDB");

print("\n========== PERFORMANCE TEST ==========\n");

// Find an existing user to test against
const user = db.users.findOne({ role: "instructor" });

if (user) {
  print("Testing index scan on email: " + user.email);

  const result = db.users.find({ email: user.email })
    .explain("executionStats");

  print("   Execution Time: " + result.executionStats.executionTimeMillis + "ms");
  print("   Documents Examined: " + result.executionStats.totalDocsExamined);
  print("   Keys Examined: " + result.executionStats.totalKeysExamined);
  print("   Index Used: " + (result.executionStats.totalKeysExamined > 0 ? "✔ YES (IXSCAN)" : "❌ NO (COLLSCAN)"));
} else {
  print("   ⚠ No users found to test performance against");
}

print("\n========== PERFORMANCE TEST COMPLETE ==========\n");
