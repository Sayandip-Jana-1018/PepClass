const printHeader = (title) => {
  console.log("\n" + "━".repeat(45));
  console.log(` ${title}`);
  console.log("━".repeat(45));
};

const now = () => new Date().toLocaleString();

module.exports = {
  printHeader,
  now
};
