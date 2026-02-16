// Hoisiting

// ===============================
// HOISTING IN JAVASCRIPT
// ===============================

console.log("===== VARIABLE HOISTING =====");

// -------------------------------
// var (Hoisted with undefined)
// -------------------------------

console.log(a);   // undefined (not error)
var a = 10;
console.log(a);   // 10


// -------------------------------
// let (Hoisted but TDZ)
// -------------------------------

try {
  console.log(b); // Error
} catch (err) {
  console.log("let error:", err.message);
}

let b = 20;
console.log(b);   // 20


// -------------------------------
// const (Hoisted but TDZ)
// -------------------------------

try {
  console.log(c); // Error
} catch (err) {
  console.log("const error:", err.message);
}

const c = 30;
console.log(c);   // 30;



console.log("\n===== FUNCTION HOISTING =====");

// -------------------------------
// Function Declaration (Hoisted)
// -------------------------------

hello(); // Works

function hello() {
  console.log("Hello from function declaration");
}


// -------------------------------
// Function Expression (Not Hoisted)
// -------------------------------

try {
  greet(); // Error
} catch (err) {
  console.log("function expression error:", err.message);
}

var greet = function () {
  console.log("Hello from function expression");
};

greet(); // Works now


// -------------------------------
// Arrow Function (Not Hoisted)
// -------------------------------

try {
  sayHi(); // Error
} catch (err) {
  console.log("arrow function error:", err.message);
}

const sayHi = () => {
  console.log("Hello from arrow function");
};

sayHi(); // Works now



console.log("\n===== CLASS HOISTING =====");

// -------------------------------
// Class (Not Hoisted)
// -------------------------------

try {
  const s = new Student(); // Error
} catch (err) {
  console.log("class error:", err.message);
}

class Student {
  constructor() {
    console.log("Student created");
  }
}

const s2 = new Student(); // Works



console.log("\n===== END OF HOISTING DEMO =====");
