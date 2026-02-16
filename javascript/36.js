// Absolute Value
console.log("abs(-10):", Math.abs(-10));

// Power
console.log("pow(2,3):", Math.pow(2, 3));

// Exponent Operator
console.log("2 ** 3:", 2 ** 3);

// Square Root
console.log("sqrt(16):", Math.sqrt(16));

// Floor
console.log("floor(4.9):", Math.floor(4.9));

// Ceil
console.log("ceil(4.1):", Math.ceil(4.1));

// Round
console.log("round(4.5):", Math.round(4.5));
console.log("round(4.4):", Math.round(4.4));

// Trunc
console.log("trunc(4.9):", Math.trunc(4.9));

console.log("max(5,10,2):", Math.max(5, 10, 2));
console.log("min(5,10,2):", Math.min(5, 10, 2));

// Random between 0 and 1
console.log("random():", Math.random());

// Random between 1 and 10
const random1to10 = Math.floor(Math.random() * 10) + 1;
console.log("Random 1 to 10:", random1to10);

// Random between min and max
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("Random 5 to 15:", getRandom(5, 15));

console.log("PI:", Math.PI);
console.log("E:", Math.E);

// Angle in radians
const angle = Math.PI / 2;

console.log("sin(90°):", Math.sin(angle));
console.log("cos(90°):", Math.cos(angle));
console.log("tan(45°):", Math.tan(Math.PI / 4));

console.log("log(10):", Math.log(10));
console.log("log10(100):", Math.log10(100));

// Sign
console.log("sign(10):", Math.sign(10));
console.log("sign(-5):", Math.sign(-5));

// Hypotenuse
console.log("hypot(3,4):", Math.hypot(3, 4));

// Circle Area
const radius = 5;
const area = Math.PI * Math.pow(radius, 2);
console.log("Area of circle:", area.toFixed(2));

// Percentage Calculation
const total = 500;
const obtained = 378;
const percentage = (obtained / total) * 100;
console.log("Percentage:", percentage.toFixed(2) + "%");

// Random OTP (4 digit)
const otp = Math.floor(1000 + Math.random() * 9000);
console.log("OTP:", otp);

let num = 10.759
console.log("Restricting to 2 decimal places: ", num.toFixed(2))
console.log("Checking whether a number or not: ", isNaN(num))