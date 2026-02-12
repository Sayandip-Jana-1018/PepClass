db.courses.aggregate([
  {
    $lookup: {
        from: "modules",
        localField: "_id",
        foreignField: "courseId",
        as: "modules"
    }
    },
    {
        $unwind: "$modules"
    },
    {   
        $project: {
            _id: 0,
            moduleTitle: "$title",
            courseName: "$modules.title"
        }
    }
])
z   
db.enrollments.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "studentId",
            foreignField: "_id",
            as: "user"
        }
    },
    { $unwind: "$user" },
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
        $project: {
            _id: 0,
            userName: "$user.name",
            courseName: "$course.title"
        }
    }
]) // display user name and course name using lookup operator 

// Aggregation to show count of enrollments for each course
db.enrollments.aggregate([
    {
        $group: {
            _id: "$courseId",
            enrollmentCount: { $sum: 1 }
        }
    },
    {
        $lookup: {
            from: "courses",
            localField: "_id",
            foreignField: "_id",
            as: "course"
        }
    },
    { $unwind: "$course" },
    {
        $project: {
            _id: 0,
            courseId: "$course._id",
            courseName: "$course.title",
            enrollmentCount: 1
        }
    }
])

// Same above we will do using let operator
db.enrollments.aggregate([
    {
        $lookup: {
            from: "users",
            let: { student_id: "$studentId" },
            pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$student_id"] } } }
            ],
            as: "user"
        }
    },
    { $unwind: "$user" },
    {
        $lookup: {
            from: "courses",
            let: { course_id: "$courseId" },
            pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$course_id"] } } }
            ],
            as: "course"
        }
    },
    { $unwind: "$course" },
    {
        $project: {
            _id: 0,
            userName: "$user.name",
            courseName: "$course.title"
        }
    }
]) // display user name and course name using let operator