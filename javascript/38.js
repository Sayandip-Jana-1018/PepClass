// ===============================
// JavaScript Date Methods Demo
// ===============================

console.log("===== DATE OBJECT DEMO =====");


// ===============================
// Create Date
// ===============================

// Current Date & Time
const now = new Date();
console.log("Current Date:", now);

// Using Timestamp (ms from 1970)
const fromTimestamp = new Date(1700000000000);
console.log("From Timestamp:", fromTimestamp);

// Using String
const fromString = new Date("2026-02-16");
console.log("From String:", fromString);

// Using Year, Month, Day (Month starts from 0)
const customDate = new Date(2026, 1, 16); // Feb 16, 2026
console.log("Custom Date:", customDate);


// ===============================
// Get Methods
// ===============================

console.log("\n===== GET METHODS =====");

console.log("Year:", now.getFullYear());
console.log("Month (0-11):", now.getMonth());
console.log("Date:", now.getDate());
console.log("Day (0=Sun):", now.getDay());

console.log("Hours:", now.getHours());
console.log("Minutes:", now.getMinutes());
console.log("Seconds:", now.getSeconds());
console.log("Milliseconds:", now.getMilliseconds());

console.log("Time (ms):", now.getTime());


// ===============================
// Set Methods
// ===============================

console.log("\n===== SET METHODS =====");

let d = new Date();

d.setFullYear(2027);
d.setMonth(5);     // June
d.setDate(20);
d.setHours(10);
d.setMinutes(30);

console.log("Modified Date:", d);


// ===============================
// Format Methods
// ===============================

console.log("\n===== FORMAT METHODS =====");

console.log("toString():", now.toString());
console.log("toDateString():", now.toDateString());
console.log("toTimeString():", now.toTimeString());

console.log("toISOString():", now.toISOString());
console.log("toUTCString():", now.toUTCString());

console.log("toLocaleString():", now.toLocaleString());
console.log("toLocaleDateString():", now.toLocaleDateString());
console.log("toLocaleTimeString():", now.toLocaleTimeString());


// ===============================
// Static Methods
// ===============================

console.log("\n===== STATIC METHODS =====");

// Current timestamp
console.log("Date.now():", Date.now());

// Parse string to timestamp
console.log("Date.parse():", Date.parse("2026-02-16"));


// ===============================
// Date Comparison
// ===============================

console.log("\n===== DATE COMPARISON =====");

const d1 = new Date("2026-01-01");
const d2 = new Date("2026-12-31");

console.log("d1 < d2:", d1 < d2);
console.log("d1 > d2:", d1 > d2);
console.log("d1 == d2:", d1 == d2);


// ===============================
// Difference Between Dates
// ===============================

console.log("\n===== DATE DIFFERENCE =====");

const start = new Date("2026-01-01");
const end = new Date("2026-02-01");

const diffMs = end - start;
const diffDays = diffMs / (1000 * 60 * 60 * 24);

console.log("Difference in ms:", diffMs);
console.log("Difference in days:", diffDays);


// ===============================
// Practical Examples
// ===============================

console.log("\n===== PRACTICAL EXAMPLES =====");

// Age Calculator
const birthDate = new Date("2003-05-10");
const today = new Date();

let age = today.getFullYear() - birthDate.getFullYear();

if (
  today.getMonth() < birthDate.getMonth() ||
  (today.getMonth() === birthDate.getMonth() &&
    today.getDate() < birthDate.getDate())
) {
  age--;
}

console.log("Age:", age);


// Greeting Based on Time
const hour = now.getHours();

if (hour < 12) {
  console.log("Good Morning ☀️");
} else if (hour < 18) {
  console.log("Good Afternoon 🌤️");
} else {
  console.log("Good Evening 🌙");
}


// ===============================
// END
// ===============================

console.log("\n===== END OF DATE DEMO =====");
