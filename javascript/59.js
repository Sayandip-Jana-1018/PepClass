// student = {
//     name:"Nikhil",
//     display:function(){
//         console.log(this.name)
//     }
// }
// student.display()

// student = {
//   name: "Nikhil",
//   display: () => {
//     console.log(this.name);
//   },
// };
// student.display();

student = {
  name: "Nikhil",
  display() {
    console.log(this.name);
  },
};
student.display();