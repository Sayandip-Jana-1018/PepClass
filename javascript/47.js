const students = [
  { id: 1, name: "Vansh", attendance: 90, score: 80 },
  { id: 2, name: "Vaishnav", attendance: 50, score: 50 },
];
function getStudentInfo(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = students.find((student) => student.id === id);
      if (found) resolve("Student Info");
      else reject("Student does not Exist");
    }, 2000);
  });
}
function getExamInfo(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = students.find((student) => student.id === id && student.score > 70);
      if (found) resolve("Exam Info Resolved");
      else reject("score too low");
    }, 3000);
  });
}
function getAttendanceInfo(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const found = students.find((student) => student.id === id && student.attendance > 70);
      if (found) resolve("Attendance Info Resolved");
      else reject("Attendance too low");
    }, 1000);
  });
}
async function main() {
  try {
    const studentId = 1;
    const result = await Promise.all([
      getStudentInfo(studentId),
      getAttendanceInfo(studentId),
      getExamInfo(studentId),
    ]);
    console.log("Student has been promoted");
  } catch (err) {
    console.log(err);
  }
}
main();