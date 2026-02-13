// const numbers = [5, 3, 6, 1];

// // ===============================
// // forEach → Just Loop (No Return)
// // ===============================

// numbers.forEach((num) => {
//   console.log("forEach:", num * 2);
// });

// // ===============================
// // map → Creates New Array
// // ===============================

// const doubled = numbers.map((num) => {
//   return num * 2;
// });

// console.log("map:", doubled);

// // ===============================
// // filter → Select Some Elements
// // ===============================

// const greaterThan4 = numbers.filter((num) => {
//   return num > 4;
// });

// console.log("filter:", greaterThan4);

// // ===============================
// // find → Find First Match
// // ===============================

// const firstGreaterThan4 = numbers.find((num) => {
//   return num > 4;
// });

// console.log("find:", firstGreaterThan4);

// // ===============================
// // reduce → Reduce to One Value
// // ===============================

// const sum = numbers.reduce((total, num) => {
//   return total + num;
// }, 0);

// console.log("reduce:", sum);

// // ===============================
// // some -> If any one elements matches the condition, result - true
// // ===============================

// const hasGreaterThan5 = numbers.some((num) => {
//   return num > 5;
// });

// console.log(hasGreaterThan5);



// let marks = [78, 50, 90, 20];

// const isPassed = marks.some((mark) => {
//   return mark >= 50;
// });

// if (isPassed) {
//   console.log("Student Passed ✅");
// } else {
//   console.log("Student Failed ❌");
// }


let marks = [78, 50, 90, 20];

const isPassed = marks.every((mark) => {
  return mark >= 50;
});

if (isPassed) {
  console.log("Student Passed ✅");
} else {
  console.log("Student Failed ❌");
}
