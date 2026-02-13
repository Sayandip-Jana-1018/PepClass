
// let score  = 90;
// if(score > 50) {
//     console.log("Pass");
// }
// else { console.log("Fail"); }

// let score = 90;
// let result = score > 50 ? "Pass" : "Fail"
// console.log(result);

// let score 
// let result = score || 30
// console.log

// Switch statement
let marks = 78;

// Convert marks to slab
switch (true) {

  case (marks >= 90 && marks <= 100):
    console.log("A+")
    break;

  case (marks >= 75 && marks < 90):
    console.log("A")
    break;

  case (marks >= 60 && marks < 75):
    console.log("B+")
    break;

  case (marks >= 50 && marks < 60):
    console.log("B")
    break;

  case (marks < 50):
    console.log("C")
    break;

  default:
    console.log("Failed")
}

