const bank = require("./data");

const isValidAmount = amt =>
  typeof amt === "number" && amt > 0;

const findAccount = accNo =>
  bank.accounts.find(a => a.accountNumber === accNo);

const hasBalance = (acc, amt) =>
  acc.balance >= amt;

module.exports = {
  isValidAmount,
  findAccount,
  hasBalance
};
