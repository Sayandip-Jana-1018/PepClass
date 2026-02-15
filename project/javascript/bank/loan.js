const config = require("./config");
const { isValidAmount, findAccount, hasBalance } = require("./validation");
const { logError, logSuccess } = require("./utils");
const { record } = require("./transaction");


const issueLoan = (accNo, amt) => {

  if (!isValidAmount(amt)) {
    logError("Invalid loan amount");
    return;
  }

  const acc = findAccount(accNo);

  if (!acc) {
    logError("Account not found");
    return;
  }

  const max = acc.balance * config.LOAN_MULTIPLIER;

  if (amt > max) {
    logError(`Max loan: ₹${max}`);
    return;
  }

  acc.loan += amt;
  acc.balance += amt;

  record(acc, "LOAN_CREDIT", amt);

  logSuccess(`Loan approved ₹${amt}`);
};


const repayLoan = (accNo, amt) => {

  if (!isValidAmount(amt)) {
    logError("Invalid repay");
    return;
  }

  const acc = findAccount(accNo);

  if (!acc) {
    logError("Account not found");
    return;
  }

  if (!hasBalance(acc, amt)) {
    logError("Insufficient balance");
    return;
  }

  if (amt > acc.loan) {
    logError("Exceeds loan");
    return;
  }

  acc.loan -= amt;
  acc.balance -= amt;

  record(acc, "LOAN_REPAY", amt);

  logSuccess(`Loan repaid ₹${amt}`);
};


module.exports = {
  issueLoan,
  repayLoan
};
