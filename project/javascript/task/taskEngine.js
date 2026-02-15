const { now } = require("./utils");

let tasks = [];
let nextId = 1;


// Validators
const isValidTitle = title =>
  typeof title === "string" && title.trim().length > 0;


// Core
const addTask = (title, priority = "medium") => {

  if (!isValidTitle(title)) {
    console.log("❌ Invalid title");
    return;
  }

  const task = {
    id: nextId++,
    title: title.trim(),
    status: "pending",
    priority,
    createdAt: now(),
    completedAt: null,
    deleted: false
  };

  tasks.push(task);

  console.log(`✅ Added: ${task.title}`);
};


const completeTask = id => {

  const task = tasks.find(t => t.id === id && !t.deleted);

  if (!task) {
    console.log("❌ Task not found");
    return;
  }

  task.status = "completed";
  task.completedAt = now();

  console.log(`✅ Completed: ${task.title}`);
};


const deleteTask = id => {

  const task = tasks.find(t => t.id === id && !t.deleted);

  if (!task) {
    console.log("❌ Task not found");
    return;
  }

  task.deleted = true;

  console.log(`🗑 Deleted: ${task.title}`);
};


const getAllTasks = () => {

  const active = tasks
    .filter(t => !t.deleted)
    .map(t => ({
      ID: t.id,
      Title: t.title,
      Status: t.status,
      Priority: t.priority
    }));

  console.table(active);
};


const getSummary = () => {

  const summary = tasks
    .filter(t => !t.deleted)
    .reduce((a, t) => {

      a.total++;
      t.status === "completed" ? a.completed++ : a.pending++;
      a[t.priority]++;

      return a;

    }, {
      total: 0,
      completed: 0,
      pending: 0,
      low: 0,
      medium: 0,
      high: 0
    });

  return summary;
};


module.exports = {
  addTask,
  completeTask,
  deleteTask,
  getAllTasks,
  getSummary
};
