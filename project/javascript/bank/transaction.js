const { now, logError, logSuccess } = require("./utils");
const { isValidAmount, findAccount, hasBalance } = require("./validation");
const config = require("./config");

const record = (acc, type, amount, ref = "") => {

  acc.transactions.push({
    type,
    amount,
    date: now(),
    balanceAfter: acc.balance,
    reference: ref
  });
};

const deposit = (accNo, amt) => {

  if (!isValidAmount(amt)) {
    logError("Invalid deposit");
    return;
  }

  const acc = findAccount(accNo);

  if (!acc) {
    logError("Account not found");
    return;
  }

  acc.balance += amt;

  record(acc, "DEPOSIT", amt);

  logSuccess(`Deposited ₹${amt} → ${accNo}`);
};


const withdraw = (accNo, amt) => {

  if (!isValidAmount(amt)) {
    logError("Invalid withdraw");
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

  if (
    acc.type === "savings" &&
    acc.balance - amt < config.SAVINGS_MIN_BALANCE
  ) {
    logError("Min balance rule violated");
    return;
  }

  acc.balance -= amt;

  record(acc, "WITHDRAW", amt);

  logSuccess(`Withdrawn ₹${amt} ← ${accNo}`);
};


const transfer = (from, to, amt) => {

  if (!isValidAmount(amt)) {
    logError("Invalid transfer");
    return;
  }

  const sender = findAccount(from);
  const receiver = findAccount(to);

  if (!sender || !receiver) {
    logError("Account not found");
    return;
  }

  if (!hasBalance(sender, amt)) {
    logError("Insufficient balance");
    return;
  }

  sender.balance -= amt;
  receiver.balance += amt;

  record(sender, "TRANSFER_OUT", amt, `To ${to}`);
  record(receiver, "TRANSFER_IN", amt, `From ${from}`);

  logSuccess(`Transferred ₹${amt} : ${from} → ${to}`);
};


module.exports = {
  deposit,
  withdraw,
  transfer,
  record
};
