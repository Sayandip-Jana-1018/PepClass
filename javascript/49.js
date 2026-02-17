const students = [
  { id: 1, name: "Vansh", s1: true, s2: true, s3: false },
  { id: 2, name: "Vaishnav", s1: true, s2: true, s3: true },
  { id: 3, name: "Nikhil", s1: false, s2: true, s3: true },
  { id: 4, name: "Vishnu", s1: false, s2: false, s3: false },
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
function getAttendanceInfoS1(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = students.find(
        (student) => student.id === id && student.s1 === true,
      );
      if (found) resolve();
      else reject("Student is Absent");
    }, 1000);
  });
}
function getAttendanceInfoS2(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = students.find(
        (student) => student.id === id && student.s2 === true,
      );
      if (found) resolve();
      else reject("Student is Absent");
    }, 1000);
  });
}
function getAttendanceInfoS3(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = students.find(
        (student) => student.id === id && student.s3 === true,
      );
      if (found) resolve();
      else reject("Student is Absent");
    }, 1000);
  });
}
async function main() {
  try {
    const studentId = 5;
    const found = await getStudentInfo(studentId);
    const result = await Promise.any([
      getAttendanceInfoS1(studentId),
      getAttendanceInfoS2(studentId),
      getAttendanceInfoS3(studentId),
    ]);
    console.log("Student is present");
  } catch (err) {
    console.log(err);
  }
}
main();

//if id is 1 > Vansh is absent