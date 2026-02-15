const bank = require("./data");
const { logError, logSuccess } = require("./utils");

const createAccount = (name, type = "savings") => {

  if (!["savings", "current"].includes(type)) {
    logError("Invalid account type");
    return;
  }

  const account = {
    accountNumber: bank.nextAccountNumber++,
    name,
    type,
    balance: 0,
    loan: 0,
    transactions: []
  };

  bank.accounts.push(account);

  logSuccess(`Account created: ${account.accountNumber}`);

  return account.accountNumber;
};

module.exports = {
  createAccount
};
