const bank = require("./data");
const { printHeader } = require("./utils");

const { createAccount } = require("./account");
const { deposit, withdraw, transfer } = require("./transaction");
const { issueLoan, repayLoan } = require("./loan");
const { applyInterest } = require("./interest");
const { showAllAccounts, bankSummary } = require("./analytics");


const runBankDemo = () => {

  printHeader(`${bank.bankName} v2.0`);

  const a1 = createAccount("Sayan", "savings");
  const a2 = createAccount("Rahul", "current");
  const a3 = createAccount("Amit", "savings");

  deposit(a1, 20000);
  deposit(a2, 15000);
  deposit(a3, 30000);

  withdraw(a1, 5000);

  transfer(a3, a1, 8000);

  issueLoan(a1, 40000);
  repayLoan(a1, 10000);

  applyInterest();

  showAllAccounts();
  bankSummary();
};


module.exports = runBankDemo;
