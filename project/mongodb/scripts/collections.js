db = db.getSiblingDB("mongoDB");

// Create collections with schema validation where needed

// USERS
db.createCollection("users");

// CATEGORIES
db.createCollection("categories");

// COURSES
db.createCollection("courses");

// LESSONS
db.createCollection("lessons");

// ENROLLMENTS
db.createCollection("enrollments");

// PAYMENTS
db.createCollection("payments");

// REVIEWS — with schema validation for rating (1-5)
db.createCollection("reviews", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["rating"],
            properties: {
                rating: {
                    bsonType: "int",
                    minimum: 1,
                    maximum: 5,
                    description: "Rating must be an integer between 1 and 5"
                }
            }
        }
    }
});

print("✅ All collections created (with review validation)");
