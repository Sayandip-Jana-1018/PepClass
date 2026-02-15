const readline = require("readline");

const showMenu = require("./menu");
const user = require("./user");
const course = require("./course");
const enroll = require("./enroll");
const review = require("./review");
const connectDB = require("./db");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(q) {
  return new Promise(resolve => rl.question(q, resolve));
}

async function viewEnrollments() {
  const db = await connectDB();

  const enrollments = await db.collection("enrollments").aggregate([
    {
      $lookup: {
        from: "users",
        localField: "studentId",
        foreignField: "_id",
        as: "student"
      }
    },
    { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "courses",
        localField: "courseId",
        foreignField: "_id",
        as: "course"
      }
    },
    { $unwind: { path: "$course", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "payments",
        localField: "paymentId",
        foreignField: "_id",
        as: "payment"
      }
    },
    { $unwind: { path: "$payment", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 0,
        Student: "$student.name",
        Course: "$course.title",
        Amount: "$payment.amount",
        PaymentStatus: "$payment.paymentStatus",
        EnrolledAt: "$enrolledAt"
      }
    }
  ]).toArray();

  if (enrollments.length === 0) {
    console.log("⚠ No enrollments found");
    return;
  }

  console.table(enrollments);
}

async function main() {

  let running = true;

  while (running) {

    showMenu();

    const choice = (await ask("Enter choice: ")).trim();

    try {

      switch (choice) {

        case "1": {
          const name = await ask("Name: ");
          const email = await ask("Email: ");
          const role = await ask("Role (student/instructor): ");
          await user.addUser(name, email, role);
          break;
        }

        case "2": {
          await user.viewUsers();
          break;
        }

        case "3": {
          const title = await ask("Course Title: ");
          const desc = await ask("Description: ");
          const price = await ask("Price: ");
          const level = await ask("Level (beginner/intermediate/advanced): ");
          await course.addCourse(title, desc, price, level);
          break;
        }

        case "4": {
          await course.viewCourses();
          break;
        }

        case "5": {
          const sEmail = await ask("Student Email: ");
          const cTitle = await ask("Course Title: ");
          await enroll(sEmail, cTitle);
          break;
        }

        case "6": {
          await viewEnrollments();
          break;
        }

        case "7": {
          const rEmail = await ask("Student Email: ");
          const rCourse = await ask("Course Title: ");
          const rating = await ask("Rating (1-5): ");
          const comment = await ask("Comment: ");
          await review.addReview(rEmail, rCourse, rating, comment);
          break;
        }

        case "8": {
          await review.viewReviews();
          break;
        }

        case "9": {
          const dEmail = await ask("Email to delete: ");
          await user.deleteUser(dEmail);
          break;
        }

        case "10": {
          const dcTitle = await ask("Course title to delete: ");
          await course.deleteCourse(dcTitle);
          break;
        }

        case "11": {
          console.log("👋 Goodbye!");
          running = false;
          rl.close();
          process.exit(0);
          break;
        }

        default:
          console.log("❌ Invalid choice. Please enter 1-11.");
      }

    } catch (err) {
      console.log("❌ Something went wrong: " + err.message);
    }
  }
}

main();
