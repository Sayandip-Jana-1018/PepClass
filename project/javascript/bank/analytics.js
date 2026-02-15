const bank = require("./data");
const { printHeader, formatMoney } = require("./utils");


const showAllAccounts = () => {

  printHeader("ALL ACCOUNTS");

  console.table(
    bank.accounts.map(a => ({
      Account: a.accountNumber,
      Name: a.name,
      Type: a.type,
      Balance: formatMoney(a.balance),
      Loan: formatMoney(a.loan),
      Txns: a.transactions.length
    }))
  );
};


const bankSummary = () => {

  const s = bank.accounts.reduce(
    (acc, cur) => {

      acc.totalBalance += cur.balance;
      acc.totalLoans += cur.loan;

      cur.type === "savings"
        ? acc.savings++
        : acc.current++;

      return acc;

    },
    {
      totalBalance: 0,
      totalLoans: 0,
      savings: 0,
      current: 0
    }
  );

  printHeader("BANK SUMMARY");

  console.log("Total Accounts :", bank.accounts.length);
  console.log("Savings        :", s.savings);
  console.log("Current        :", s.current);
  console.log("Total Balance  :", formatMoney(s.totalBalance));
  console.log("Total Loans    :", formatMoney(s.totalLoans));
};

module.exports = {
  showAllAccounts,
  bankSummary
};
