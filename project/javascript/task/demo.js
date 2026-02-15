const engine = require("./taskEngine");
const { printHeader } = require("./utils");


const runTaskDemo = () => {

  printHeader("TASK MANAGER");

  engine.addTask("Learn JS", "high");
  engine.addTask("DSA Practice", "high");
  engine.addTask("Assignment", "medium");

  engine.completeTask(2);

  engine.deleteTask(3);

  engine.getAllTasks();

  const s = engine.getSummary();

  printHeader("SUMMARY");

  console.log(s);
};


module.exports = runTaskDemo;
