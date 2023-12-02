const Transaction = require('../models/transactionModel');



// this is where all report generation would happen
// could use kafka or something to automatically schedule reports




function sortByTransactionDate(a, b) {
  const dateA = new Date(a.transaction_date);
  const dateB = new Date(b.transaction_date);
  return dateA - dateB;
}





// the class that will actually perform reports
class Reporter {

  // summarizes the amount going in and out for a month

  // report contents: starting balance, total debits/credits, net income, final balance
  static async netIncomeMonthly (month, year){
    console.log('performing net income report');

    // retrieve all data
    // let transactions;
    // Transaction.getTransactionsByMonth(month, year, (error, results)=>{
    //   if(error){
    //     console.log('Failed to complete Net Income Report. Error: ' + error);
    //   } else {
    //     transactions = results.map(result => result.get());
    //     console.log(transactions);
    //   }
    // });
    let results;

    try {
      results = await Transaction.getTransactionsByMonth(month, year);
    } catch (error) {
      console.log(error);
      return;
    }


    // extract data and sort by date
    let transactions = results.map(result => result.get());
    transactions.sort(sortByTransactionDate);

    console.log(transactions);

    // find starting balance - assumes the transactions are sorted by occurence
    let startingBalance = transactions[0].balance;
    if (transactions[0].debit != null){
      startingBalance += transactions[0].debit;
    } else {
      startingBalance -= transactions[0].credit;
    }

    // also depends on sorting by occurence
    const finalBalance = transactions[transactions.length -1].balance;

    // total up debits and credits
    let debits = 0;
    let credits = 0;
    for(const transaction of transactions){
      if(transaction.debit != null){
        debits += transaction.debit;
      } else {
        credits += transaction.credit;
      }
    }

    const netIncome = credits - debits;

    const outputString = `Starting balance: ${startingBalance} | NetIncome: ${netIncome} | Debits: ${debits} | Credits: ${credits} | Final Balance: ${finalBalance}`;
    console.log(outputString);

    // persist to memory
  }
}

module.exports = Reporter;