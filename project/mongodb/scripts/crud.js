db = db.getSiblingDB("mongoDB");

print("All Courses:");
printjson(db.courses.find().toArray());


// UPDATE
db.courses.updateOne(
 { title: "Full Stack MERN" },
 { $set: { price: 5999 } }
);


// DELETE LOW RATED (example)
db.reviews.deleteMany({ rating: { $lt: 3 } });

print("CRUD operations executed");
