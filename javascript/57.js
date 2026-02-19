// const employees = ["John", "Cathy", "Mike"];
// for(let e of employees){
//     console.log(e)
// }
const student = {
  name: "John",
  age: 23,
};
for(let s of Object.keys(student)){
    console.log(student[s])
}