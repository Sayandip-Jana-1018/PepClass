const printHeader = (title) => {
  console.log("\n" + "━".repeat(50));
  console.log(` ${title}`);
  console.log("━".repeat(50));
};

const formatMoney = amt => `₹${amt.toLocaleString()}`;

const now = () => new Date().toLocaleString();

const logError = msg => console.log("❌ " + msg);
const logSuccess = msg => console.log("✅ " + msg);

module.exports = {
  printHeader,
  formatMoney,
  now,
  logError,
  logSuccess
};
