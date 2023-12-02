// Complex checks involving business logic or multiple steps are better handled in the 
// service layer to keep the controller lean and focused on managing requests.

const Transaction = require('../models/transactionModel');


// function standardCallback(error, results){
//   if(error){
//     reject(error);
//     return;
//   }
//   resolve(results);
// }


class TransactionService {

  static async createTransaction(transactionData){
    // input verification

    if(transactionData){
      return new Promise((resolve, reject) => {
        Transaction.createTransaction(transactionData, (error, results)=>{
          if(error) {
            reject(error);
            return;
          }
          resolve(results);
        })
      })
    } else {
      reject('no input');
    }
  }


  static async getAllTransactions() {
    return new Promise((resolve, reject) => {
      Transaction.getAllTransactions((error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
      // const results = Transaction.getAllTransactions();
    });
  }

  static async getTransactionsByType(type) {
    if(type == "debit"){
      return new Promise((resolve, reject) => {
        Transaction.getDebitTransactions((error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        Transaction.getCreditTransactions((error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      })
    }
  }

  static async getTransactionsBySpecificDate(type, date){
    const [year, month, day] = date.split("-");

    if(type == "day"){
      console.log('(services)');
      return new Promise((resolve, reject) => {
        Transaction.getTransactionsByDay(date, (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      });
    
    } else if(type == "month"){
      return new Promise((resolve, reject) => {
        Transaction.getTransactionsByMonth(month, year, (error, results) => {
          if(error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      });
    
    } else {
      return new Promise((resolve, reject) => {
        Transaction.getTransactionsByYear(year, (error, results) => {
          if(error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      });
    }
  }

  static async getTransactionsByRangeDate(startDate, endDate){
    // between start and end
    if(startDate && endDate){
      console.log('(Services) finding transactions between ' + startDate + ' and ' + endDate);
      return new Promise((resolve, reject) => {
        Transaction.getTransactionBetweenDates(startDate, endDate, (error, results) => {
          if(error) {
            reject(error);
            return;
          }
          resolve(results);
        })
      });

    // from start and onward
    } else if(startDate){
      console.log('(Services) finding transactions after ' + startDate);
      return new Promise((resolve, reject) => {
        Transaction.getTransactionsAfterDate(startDate, (error, results) => {
          if(error) {
            reject(error);
            return;
          }
          resolve(results);
        })
      });

    // from beginning till end
    } else {
      console.log('(Services) finding transactions before ' + endDate);
      return new Promise((resolve, reject) => {
        Transaction.getTransactionsBeforeDate(endDate, (error, results) => {
          if(error) {
            reject(error);
            return;
          }
          resolve(results);
        })
      });
    }
  }

  // delete operations

  static async deleteTransaction(id){
    if(id){
      return new Promise((resolve, reject) => {
        Transaction.deleteTransaction(id, (error, results)=>{
          if(error) {
            reject(error);
            return;
          }
          resolve(results);
        });
      })
    } else {
      reject('no input');
    }
  }
}

module.exports = TransactionService;