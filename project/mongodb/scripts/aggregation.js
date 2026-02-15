db = db.getSiblingDB("mongoDB");


// TOP COURSES
print("Top Courses:");
printjson(
 db.courses.aggregate([
   { $sort: { rating: -1 } },
   { $limit: 3 }
 ]).toArray()
);


// REVENUE
print("Revenue Per Course:");
printjson(
 db.enrollments.aggregate([
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
     $group: {
       _id: "$courseId",
       revenue: { $sum: "$pay.amount" }
     }
   }
 ]).toArray()
);
