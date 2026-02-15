const config = require("./config");
const bank = require("./data");
const { logSuccess } = require("./utils");
const { record } = require("./transaction");


const applyInterest = () => {

  bank.accounts
    .filter(a => a.type === "savings")
    .forEach(acc => {

      const interest =
        acc.balance * config.SAVINGS_INTEREST;

      acc.balance += interest;

      record(acc, "INTEREST", interest);

      logSuccess(`Interest added → ${acc.accountNumber}`);
    });
};

module.exports = {
  applyInterest
};
