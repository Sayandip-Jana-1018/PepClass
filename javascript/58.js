const employee = {
  name: "Amit",
  greet() {
    console.log(this.name);
  },
};
employee.greet();