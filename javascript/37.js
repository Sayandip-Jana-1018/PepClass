// ===============================
// JavaScript String Methods Demo
// ===============================

let str = "Hello World";

console.log("Original String:", str);


// ===============================
// Case Conversion
// ===============================

console.log("toLowerCase():", str.toLowerCase());
console.log("toUpperCase():", str.toUpperCase());


// ===============================
// Index Methods
// ===============================

console.log("indexOf('o'):", str.indexOf("o"));
console.log("lastIndexOf('o'):", str.lastIndexOf("o"));


// ===============================
// Search Methods
// ===============================

console.log("includes('World'):", str.includes("World"));
console.log("startsWith('Hello'):", str.startsWith("Hello"));
console.log("endsWith('World'):", str.endsWith("World"));


// ===============================
// Extracting Strings
// ===============================

console.log("slice(0,5):", str.slice(0, 5));
console.log("substring(0,5):", str.substring(0, 5));
console.log("substr(0,5):", str.substr(0, 5)); // (old method)


// ===============================
// Replace
// ===============================

console.log("replace('World','JS'):", str.replace("World", "JS"));


// ===============================
// Split
// ===============================

console.log("split(' '):", str.split(" "));


// ===============================
// Trim (Remove Spaces)
// ===============================

let str2 = "   Hello JS   ";

console.log("Before Trim:", str2);
console.log("trim():", str2.trim());
console.log("trimStart():", str2.trimStart());
console.log("trimEnd():", str2.trimEnd());


// ===============================
// Character Access
// ===============================

console.log("charAt(1):", str.charAt(1));
console.log("charCodeAt(1):", str.charCodeAt(1));
console.log("str[1]:", str[1]);


// ===============================
// Concatenation
// ===============================

let str3 = "JavaScript";

console.log("concat():", str.concat(" ", str3));


// ===============================
// Repeat
// ===============================

console.log("repeat(3):", "Hi ".repeat(3));


// ===============================
// Padding
// ===============================

console.log("padStart:", "5".padStart(3, "0"));
console.log("padEnd:", "5".padEnd(3, "0"));


// ===============================
// Match & Search (Regex)
// ===============================

let text = "I love JavaScript and JavaScript loves me";

console.log("match('JavaScript'):", text.match(/JavaScript/g));
console.log("search('love'):", text.search("love"));


// ===============================
// Comparison
// ===============================

console.log("localeCompare:", "apple".localeCompare("banana"));


// ===============================
// Ends
// ===============================

console.log("\n===== END OF STRING DEMO =====");
