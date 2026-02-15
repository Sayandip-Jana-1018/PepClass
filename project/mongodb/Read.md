# 🎓 E-Learning Platform — MongoDB Project

> A MongoDB-based backend system for an **E-Learning Platform** similar to Udemy, built as a Mini Capstone for MERN Stack Preparation.

| Detail       | Value                          |
|-------------|--------------------------------|
| **Author**  | Sayan                          |
| **Course**  | MERN Stack Preparation         |
| **Database**| MongoDB                        |
| **Runtime** | Node.js                        |

---

## 📋 Table of Contents

- [Features](#-features)
- [Database Schema](#-database-schema)
- [Folder Structure](#-folder-structure)
- [File Reference](#-file-reference)
- [Setup & Execution](#-setup--execution)
- [CLI Backend System](#-cli-backend-system)
- [Data Propagation](#-data-propagation)
- [Indexing & Performance](#-indexing--performance)
- [Validation & Security](#-validation--security)

---

## ✨ Features

| Category                 | Details                                                         |
|--------------------------|----------------------------------------------------------------|
| 📐 Schema Design         | 7 collections with proper relationships (FK references)        |
| 📝 CRUD Operations       | Create, Read, Update, Delete across all collections            |
| 📊 Aggregation Reports   | Revenue per course, Instructor earnings, Top rated courses     |
| 🌱 Bulk Data Seeder      | Realistic names, random enrollments, auto student counts       |
| 💻 CLI Backend Panel     | 11 interactive operations via terminal                         |
| ⚡ Index Optimization    | Unique & compound indexes with IXSCAN proof                   |
| 🛡️ Schema Validation     | JSON Schema on reviews (rating 1–5 enforced at DB level)      |
| 🔄 Data Propagation      | Cascade delete & auto-update across related collections        |
| 🚨 Error Handling        | Connection failure, input validation, payment rollback         |
| 📄 One-Command Demo      | `mongosh reports/demo.js` shows everything in one shot         |

---

## 🗃️ Database Schema

### Entity Relationship Diagram

```
USERS (Instructor) ──→ COURSES ──→ LESSONS
USERS (Student)    ──→ ENROLLMENTS ──→ PAYMENTS
                           │
                        REVIEWS
CATEGORIES ──→ COURSES
```

### Collections

<details>
<summary><b>1. users</b></summary>

| Field       | Type     | Notes               |
|------------|----------|----------------------|
| `_id`      | ObjectId | Primary Key          |
| `name`     | String   |                      |
| `email`    | String   | **Unique Index**     |
| `password` | String   |                      |
| `role`     | String   | `student` / `instructor` |
| `isVerified` | Boolean |                    |
| `createdAt` | Date    |                      |

</details>

<details>
<summary><b>2. courses</b></summary>

| Field           | Type     | Notes                              |
|----------------|----------|------------------------------------|
| `_id`          | ObjectId | Primary Key                        |
| `title`        | String   |                                    |
| `description`  | String   |                                    |
| `price`        | Number   |                                    |
| `instructorId` | ObjectId | FK → `users`                       |
| `categoryId`   | ObjectId | FK → `categories`                  |
| `rating`       | Number   | Auto-calculated average            |
| `totalStudents`| Number   | Auto-updated on enroll/delete      |
| `level`        | String   | `beginner` / `intermediate` / `advanced` |
| `createdAt`    | Date     |                                    |

</details>

<details>
<summary><b>3. lessons</b></summary>

| Field      | Type     | Notes          |
|-----------|----------|----------------|
| `_id`     | ObjectId | Primary Key    |
| `courseId` | ObjectId | FK → `courses` |
| `title`   | String   |                |
| `videoUrl` | String  |                |
| `duration` | Number  | Minutes        |
| `order`   | Number   |                |

</details>

<details>
<summary><b>4. enrollments</b></summary>

| Field       | Type     | Notes                                     |
|------------|----------|-------------------------------------------|
| `_id`      | ObjectId | Primary Key                               |
| `studentId`| ObjectId | FK → `users`                              |
| `courseId`  | ObjectId | FK → `courses`                            |
| `paymentId`| ObjectId | FK → `payments`                           |
| `enrolledAt`| Date    |                                           |

> **Compound Unique Index** on `studentId + courseId` prevents duplicate enrollment.

</details>

<details>
<summary><b>5. payments</b></summary>

| Field           | Type     | Notes          |
|----------------|----------|----------------|
| `_id`          | ObjectId | Primary Key    |
| `studentId`    | ObjectId | FK → `users`   |
| `amount`       | Number   |                |
| `paymentStatus`| String   | `success`      |
| `transactionId`| String   | Auto-generated |
| `createdAt`    | Date     |                |

</details>

<details>
<summary><b>6. reviews</b> (Schema Validated)</summary>

| Field       | Type     | Notes                              |
|------------|----------|------------------------------------|
| `_id`      | ObjectId | Primary Key                        |
| `studentId`| ObjectId | FK → `users`                       |
| `courseId`  | ObjectId | FK → `courses`                     |
| `rating`   | Integer  | **1–5 only** (JSON Schema enforced)|
| `comment`  | String   |                                    |
| `createdAt`| Date     |                                    |

</details>

<details>
<summary><b>7. categories</b></summary>

| Field        | Type     | Notes       |
|-------------|----------|-------------|
| `_id`       | ObjectId | Primary Key |
| `name`      | String   |             |
| `description`| String  |             |

</details>

---

## 📁 Folder Structure

```
mongodb/
│
├── backend-cli/              → CLI Admin System (Node.js)
│   ├── app.js                → Main entry point (11 menu options)
│   ├── db.js                 → MongoDB connection handler
│   ├── menu.js               → CLI menu display
│   ├── user.js               → Add / View / Delete User (cascade)
│   ├── course.js             → Add / View / Delete Course (cascade)
│   ├── enroll.js             → Enroll student with auto payment
│   └── review.js             → Add / View Review (auto rating update)
│
├── reports/                  → Demo & Output Reports
│   ├── demo.js               → ⭐ Master demo (all data + analytics)
│   └── output.js             → Quick data dump report
│
├── scripts/                  → Database Scripts (run via mongosh)
│   ├── setup.js              → Drop & reset database
│   ├── collections.js        → Create collections (with validation)
│   ├── indexes.js            → Create unique + compound indexes
│   ├── insertData.js         → Insert minimal sample data
│   ├── bulkData.js           → Realistic bulk seeder (12 users, 3 courses, etc.)
│   ├── crud.js               → CRUD operations demo
│   ├── aggregation.js        → Revenue & top courses
│   ├── performance.js        → Explain plan / index scan proof
│   └── validation.js         → 5 PASS/FAIL validation tests
│
├── package.json
└── Read.md                    → This file
```

---

## 📖 File Reference

### Scripts (`mongosh` commands)

| File              | Purpose                                                    |
|-------------------|------------------------------------------------------------|
| `setup.js`        | Drops the entire `mongoDB` database for a clean start      |
| `collections.js`  | Creates all 7 collections; `reviews` has JSON Schema validator |
| `indexes.js`      | Unique index on `users.email`, compound unique on `enrollments(studentId + courseId)` |
| `insertData.js`   | Inserts 2 users, 1 category, 1 course, 1 lesson, 1 enrollment, 1 payment, 1 review |
| `bulkData.js`     | Clears all & inserts: 2 instructors, 10 students, 3 categories, 3 courses, 9 lessons, 10 enrollments/payments/reviews |
| `crud.js`         | Demonstrates find, updateOne, deleteMany                   |
| `aggregation.js`  | `$lookup` + `$group` for revenue per course & top courses  |
| `performance.js`  | `explain("executionStats")` — proves IXSCAN index usage    |
| `validation.js`   | 5 tests: duplicate email, rating >5, <1, negative, duplicate enrollment |

### Backend CLI (`node` commands)

| File         | Exports                     | Key Features                                          |
|--------------|-----------------------------|------------------------------------------------------|
| `app.js`     | —                           | 11-option menu loop, `try/catch`, `process.exit(0)`  |
| `db.js`      | `connectDB()`               | Singleton connection, failure detection               |
| `menu.js`    | `showMenu()`                | Displays numbered menu                               |
| `user.js`    | `addUser`, `viewUsers`, `deleteUser` | Email/role validation, cascade delete         |
| `course.js`  | `addCourse`, `viewCourses`, `deleteCourse` | Price/level validation, cascade delete   |
| `enroll.js`  | `enrollStudent`             | Duplicate check, auto payment, rollback on failure    |
| `review.js`  | `addReview`, `viewReviews`  | NaN guard, duplicate → update, auto course rating     |

### Reports (`mongosh` commands)

| File        | Purpose                                                          |
|-------------|------------------------------------------------------------------|
| `demo.js`   | ⭐ Master demo: counts, all data, analytics, performance, validation |
| `output.js` | Quick dump of all collections + revenue + instructor earnings    |

---

## 🚀 Setup & Execution

### Fresh Start (step by step)

```bash
cd C:\Users\Sayan\Desktop\PepMern\project\mongodb

# 1. Drop old database
mongosh scripts/setup.js

# 2. Create collections (with review validation)
mongosh scripts/collections.js

# 3. Create indexes
mongosh scripts/indexes.js

# 4. Seed realistic bulk data
mongosh scripts/bulkData.js

# 5. ⭐ Run the master demo report
mongosh reports/demo.js

# 6. Run validation tests (5 PASS/FAIL)
mongosh scripts/validation.js

# 7. ⭐ Launch CLI backend
cd backend-cli
node app.js
```

### What `demo.js` Shows

| Section                | Details                                       |
|------------------------|-----------------------------------------------|
| Collection Summary     | Document count for each of the 7 collections  |
| All Data               | Users, Courses, Categories, Lessons, Enrollments, Payments, Reviews |
| Top Rated Courses      | Sorted by rating (descending), top 3          |
| Revenue Per Course     | `$lookup` enrollments → payments, grouped     |
| Instructor Earnings    | Total earnings per instructor (with name)     |
| Performance Test       | Execution time, docs/keys examined, IXSCAN proof |
| Validation Check       | Rating range check + orphan enrollment detection |

---

## 💻 CLI Backend System

Run with: `node app.js` (from `backend-cli/` folder)

```
========= BACKEND CLI =========

 1.  Add User
 2.  View Users
 3.  Add Course
 4.  View Courses
 5.  Enroll Student
 6.  View Enrollments
 7.  Add Review
 8.  View Reviews
 9.  Delete User
 10. Delete Course
 11. Exit

===============================
```

| # | Operation          | Inputs                              | Validations                                    |
|---|--------------------|-------------------------------------|------------------------------------------------|
| 1 | Add User           | Name, Email, Role                   | Non-empty, valid email format, role must be `student`/`instructor`, duplicate email check |
| 2 | View Users         | —                                   | Shows formatted table                         |
| 3 | Add Course         | Title, Description, Price, Level    | Non-empty, price > 0, level must be `beginner`/`intermediate`/`advanced`, duplicate check |
| 4 | View Courses       | —                                   | Shows table with title, desc, price, rating, students, level |
| 5 | Enroll Student     | Student Email, Course Title         | Student must exist, course must exist, no duplicate enrollment |
| 6 | View Enrollments   | —                                   | Shows student name, course, amount, payment status |
| 7 | Add Review         | Email, Course Title, Rating, Comment| Student must be enrolled, rating 1–5, duplicate → update |
| 8 | View Reviews       | —                                   | Shows student name, course, rating, comment, date |
| 9 | Delete User        | Email                               | Cascade deletes all related data               |
| 10| Delete Course      | Course Title                        | Cascade deletes all related data               |
| 11| Exit               | —                                   | Clean exit with `process.exit(0)`              |

---

## 🔄 Data Propagation

All data changes **automatically propagate** to related collections:

```
┌─────────────────┐     ┌──────────────────────────────────────────────────┐
│ Action          │     │ Cascade Effect                                   │
├─────────────────┤     ├──────────────────────────────────────────────────┤
│ Enroll Student  │ ──→ │ Auto-creates payment + increments totalStudents  │
│ Add/Update Review│ ──→ │ Auto-recalculates course average rating          │
│ Delete Student  │ ──→ │ Deletes enrollments → payments → reviews         │
│                 │     │ Decrements totalStudents on affected courses      │
│ Delete Instructor│──→ │ Deletes all their courses (each cascades below)  │
│ Delete Course   │ ──→ │ Deletes enrollments → payments → reviews → lessons│
│ Enrollment Fail │ ──→ │ Auto-rollback payment                            │
└─────────────────┘     └──────────────────────────────────────────────────┘
```

---

## ⚡ Indexing & Performance

| Index                                   | Type            | Purpose                          |
|-----------------------------------------|-----------------|----------------------------------|
| `users.email`                           | Unique          | Prevents duplicate accounts      |
| `enrollments(studentId + courseId)`      | Compound Unique | Prevents double enrollment       |

**Performance proof** (`performance.js` / `demo.js`):

```
Testing index scan on email: sayanjana@mail.com
   Execution Time: 0ms
   Documents Examined: 1
   Keys Examined: 1
   Index Used: ✔ YES (IXSCAN)
```

---

## 🛡️ Validation & Security

### Application Level

| Check                | Where             | Behavior                              |
|----------------------|-------------------|---------------------------------------|
| Email format         | `user.js`         | Must contain `@` and `.`              |
| Role validation      | `user.js`         | Must be `student` or `instructor`     |
| Price validation     | `course.js`       | Must be a positive number             |
| Level validation     | `course.js`       | Must be `beginner`/`intermediate`/`advanced` |
| Rating validation    | `review.js`       | Must be integer 1–5, NaN rejected     |
| Empty input guard    | All CLI files     | All fields trimmed and checked        |
| Duplicate prevention | user, course, enroll | Email, title, enrollment checked    |

### Database Level

| Mechanism              | Collection    | Effect                                  |
|------------------------|---------------|-----------------------------------------|
| Unique Index           | `users`       | Blocks duplicate email insert           |
| Compound Unique Index  | `enrollments` | Blocks duplicate student+course insert  |
| JSON Schema Validator  | `reviews`     | Blocks rating outside 1–5 at DB level   |

### Validation Test Results (`validation.js`)

```
TEST 1: Duplicate Email      → ✔ PASS (unique index)
TEST 2: Rating > 5           → ✔ PASS (schema validator)
TEST 3: Rating < 1           → ✔ PASS (schema validator)
TEST 4: Negative Rating      → ✔ PASS (schema validator)
TEST 5: Duplicate Enrollment → ✔ PASS (compound index)
```

---

## 📌 Outcome

This project demonstrates a strong foundation for **MERN Stack backend development**, simulating real-world E-Learning platforms with:

- ✅ Proper schema design with referential integrity
- ✅ Full CRUD + aggregation pipelines
- ✅ Application-level + database-level validation
- ✅ Performance optimization with indexes
- ✅ Cascade operations for data integrity
- ✅ Error handling and graceful edge case coverage

---

<p align="center"><i>Built with ❤️ using MongoDB & Node.js</i></p>
