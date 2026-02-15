                        ┌──────────────┐
                        │   USERS      │
                        │──────────────│
                        │ _id (PK)     │
                        │ name         │
                        │ email (UQ)   │
                        │ password     │
                        │ role         │
                        │ isVerified   │
                        │ createdAt    │
                        └──────┬───────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
         (Instructor)                   (Student)
                │                             │
                │                             │
        ┌───────▼────────┐           ┌────────▼─────────┐
        │   COURSES       │           │   PAYMENTS        │
        │────────────────│           │──────────────────│
        │ _id (PK)        │           │ _id (PK)           │
        │ title           │           │ studentId (FK)     │
        │ description     │           │ amount             │
        │ price            │           │ status             │
        │ rating           │           │ transactionId      │
        │ level            │           │ createdAt          │
        │ instructorId(FK) │           └────────┬──────────┘
        │ categoryId (FK)  │                    │
        └───────┬─────────┘                    │
                │                              │
                │                              │
        ┌───────▼────────┐             ┌────────▼─────────┐
        │   LESSONS       │             │   ENROLLMENTS     │
        │────────────────│             │──────────────────│
        │ _id (PK)        │             │ _id (PK)           │
        │ courseId (FK)   │◄────────────┤ studentId (FK)     │
        │ title           │             │ courseId (FK)      │
        │ videoUrl        │             │ paymentId (FK)     │
        │ duration        │             │ enrolledAt         │
        │ order           │             └────────┬──────────┘
        └────────────────┘                      │
                                                │
                                      ┌─────────▼─────────┐
                                      │   REVIEWS          │
                                      │───────────────────│
                                      │ _id (PK)            │
                                      │ studentId (FK)      │
                                      │ courseId (FK)       │
                                      │ rating (1-5)        │
                                      │ comment             │
                                      │ createdAt           │
                                      └────────────────────┘


        ┌────────────────┐
        │  CATEGORIES     │
        │────────────────│
        │ _id (PK)        │
        │ name            │
        │ description     │
        └───────▲────────┘
                │
                │
          (Many Courses)

====================================================
   E-LEARNING PLATFORM - MONGODB PROJECT
====================================================

Author   : Sayan
Course   : MERN Stack Preparation
Database : MongoDB
Project  : Mini Capstone (Udemy-like Platform)

----------------------------------------------------
PROJECT DESCRIPTION
----------------------------------------------------

This project is a MongoDB-based backend system
for an E-Learning Platform similar to Udemy.

It manages:

- Users (Students & Instructors)
- Courses (with levels & descriptions)
- Lessons
- Enrollments
- Payments
- Reviews (with schema validation)
- Categories

It also includes:

- Bulk Data Generator (Realistic Seeder)
- CLI Backend System (11 Operations)
- Aggregation Analytics (Revenue, Earnings)
- Performance Optimization (IXSCAN Proof)
- Schema Validation Rules (Rating 1-5)
- Data Integrity Checks (Orphan Detection)
- Cascade Deletion (User/Course → Related Data)
- One-Command Demo Report

----------------------------------------------------
FOLDER STRUCTURE
----------------------------------------------------

mongodb/
│
├── backend-cli/     → CLI Admin System (Node.js)
│   ├── app.js       → Main entry point (11 menu option)
│   ├── db.js        → MongoDB connection handler
│   ├── menu.js      → CLI menu display
│   ├── user.js      → Add/View/Delete User (cascade)
│   ├── course.js    → Add/View/Delete Course (cascade)
│   ├── enroll.js    → Enroll student with payment
│   └── review.js    → Add/View Review (auto rating)
│
├── reports/         → Demo & Output Reports
│   ├── demo.js      → Master demo (all data + analytics)
│   └── output.js    → Quick data output report
│
├── scripts/         → Database Scripts
│   ├── setup.js     → Drop & reset database
│   ├── collections.js → Create collections (with validation)
│   ├── indexes.js   → Create unique indexes
│   ├── insertData.js → Insert sample data
│   ├── bulkData.js  → Realistic bulk seeder
│   ├── crud.js      → CRUD operations demo
│   ├── aggregation.js → Revenue & top courses
│   ├── performance.js → Explain plan test
│   └── validation.js → 5 PASS/FAIL validation tests
│
├── node_modules/    → Dependencies
├── package.json     → Project config
└── Read.md          → This file

----------------------------------------------------
COLLECTIONS
----------------------------------------------------

1. users
2. courses
3. lessons
4. enrollments
5. payments
6. reviews (with JSON Schema validation)
7. categories

----------------------------------------------------
DATABASE SCHEMA
----------------------------------------------------

USERS
- _id
- name
- email (unique index)
- password
- role (student/instructor)
- isVerified
- createdAt

COURSES
- _id
- title
- description
- price
- instructorId (FK → users)
- categoryId (FK → categories)
- rating (auto-calculated average)
- totalStudents (auto-updated count)
- level (beginner/intermediate/advanced)
- createdAt

LESSONS
- _id
- courseId (FK → courses)
- title
- videoUrl
- duration
- order

ENROLLMENTS
- _id
- studentId (FK → users)
- courseId (FK → courses)
- paymentId (FK → payments)
- enrolledAt
(Compound unique index on studentId + courseId)

PAYMENTS
- _id
- studentId (FK → users)
- amount
- paymentStatus
- transactionId
- createdAt

REVIEWS
- _id
- studentId (FK → users)
- courseId (FK → courses)
- rating (1-5, enforced by JSON Schema)
- comment
- createdAt

CATEGORIES
- _id
- name
- description

----------------------------------------------------
RELATIONSHIP DIAGRAM
----------------------------------------------------

USERS (Instructor) ---> COURSES ---> LESSONS
USERS (Student)  ---> ENROLLMENTS ---> PAYMENTS
                         |
                         |
                      REVIEWS

CATEGORIES ---> COURSES

----------------------------------------------------
SETUP & EXECUTION (FRESH START)
----------------------------------------------------

1. Go to mongodb folder

cd C:\Users\Sayan\Desktop\PepMern\project\mongodb


2. Reset Database (drops everything)

mongosh scripts/setup.js


3. Create Collections (with review validation)

mongosh scripts/collections.js


4. Create Indexes (unique email, unique enrollment)

mongosh scripts/indexes.js


5. Insert Bulk Data (12 users, 3 courses, 9 lessons, etc.)

mongosh scripts/bulkData.js


6. Run CRUD Operations

mongosh scripts/crud.js


7. Run Aggregation (Revenue & Top Courses)

mongosh scripts/aggregation.js


8. Run Performance Test (Index Scan Proof)

mongosh scripts/performance.js


9. Run Validation Tests (5 PASS/FAIL tests)

mongosh scripts/validation.js

----------------------------------------------------
PROJECT DEMO
----------------------------------------------------

Run full demo:

mongosh reports/demo.js

This shows:

- Collection Summary (document counts)
- All Data (Users, Courses, Categories, etc.)
- Top Rated Courses (Analytics)
- Revenue Per Course (with course names)
- Instructor Earnings (with instructor names)
- Performance Test (Index Scan confirmation)
- Validation Check (rating range + orphan detection)

----------------------------------------------------
CLI BACKEND SYSTEM
----------------------------------------------------

Run Admin Panel:

cd backend-cli
node app.js

Features (11 Operations):

 1.  Add User (with email/role validation)
 2.  View Users (formatted table)
 3.  Add Course (title, description, price, level)
 4.  View Courses (with price, rating, students)
 5.  Enroll Student (with auto payment creation)
 6.  View Enrollments (student name + course + payment)
 7.  Add Review (with rating 1-5 validation)
 8.  View Reviews (student name + course + comment)
 9.  Delete User (cascade: enrollments, payments, reviews)
 10. Delete Course (cascade: enrollments, payments, reviews, lessons)
 11. Exit

----------------------------------------------------
DATA PROPAGATION (CASCADE)
----------------------------------------------------

When a USER is deleted:
→ If Student: deletes enrollments, payments, reviews
  → Decrements totalStudents on affected courses
→ If Instructor: deletes all their courses
  → Each course deletion cascades to its enrollments,
    payments, reviews, and lessons

When a COURSE is deleted:
→ Deletes enrollments, payments, reviews, lessons for that course

When a REVIEW is added/updated:
→ Auto-recalculates course average rating

When a STUDENT is enrolled:
→ Auto-creates payment record
→ Increments totalStudents on the course
→ On failure: auto-rollback payment

----------------------------------------------------
INDEXING & OPTIMIZATION
----------------------------------------------------

Indexes Used:

- users.email (Unique) → prevents duplicate accounts
- enrollments.studentId + courseId (Compound Unique)
  → prevents double enrollment

Explain Plan used to test performance:
- Confirms IXSCAN (Index Scan) vs COLLSCAN (Full Scan)
- Demo shows: execution time, docs examined, keys examined

----------------------------------------------------
SECURITY & VALIDATION
----------------------------------------------------

Application Level:
- Email format validation (must contain @ and .)
- Role validation (must be student/instructor)
- Price validation (must be positive number)
- Rating validation (must be integer 1-5)
- Level validation (beginner/intermediate/advanced)
- Empty input prevention on all fields
- Duplicate checks (email, course title, enrollment)

Database Level:
- Unique Email Index (prevents duplicate users)
- Compound Unique Index (prevents double enrollment)
- JSON Schema Validator on reviews (rating must be int 1-5)

Error Handling:
- MongoDB connection failure detection
- Try/catch on all DB operations
- Payment rollback on enrollment failure
- Graceful exit (no hanging)

----------------------------------------------------
VALIDATION TEST RESULTS
----------------------------------------------------

TEST 1: Duplicate Email      → ✔ PASS (unique index)
TEST 2: Rating > 5           → ✔ PASS (schema validator)
TEST 3: Rating < 1           → ✔ PASS (schema validator)
TEST 4: Negative Rating      → ✔ PASS (schema validator)
TEST 5: Duplicate Enrollment → ✔ PASS (compound index)

----------------------------------------------------
PROJECT FEATURES
----------------------------------------------------

✔ Proper Schema Design (7 Collections)
✔ CRUD Operations (Create, Read, Update, Delete)
✔ Aggregation Reports (Revenue, Earnings, Top Courses)
✔ Bulk Data Seeder (Realistic Names & Data)
✔ CLI Backend Panel (11 Operations)
✔ Index Optimization (IXSCAN Proof)
✔ Schema Validation (JSON Schema on Reviews)
✔ Data Propagation (Cascade Delete & Auto Update)
✔ Error Handling (Connection, Input, Rollback)
✔ Professional Folder Structure
✔ One-Command Demo Report

----------------------------------------------------
OUTCOME
----------------------------------------------------

This project provides a strong foundation
for MERN Stack backend development.

It simulates real-world E-Learning platforms
and follows best database practices including:

- Referential integrity (cascade operations)
- Data validation (application + database level)
- Performance optimization (indexing)
- Error handling and edge case coverage

----------------------------------------------------
END OF DOCUMENT
----------------------------------------------------
