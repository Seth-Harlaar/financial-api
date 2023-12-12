// Complex checks involving business logic or multiple steps are better handled in the 
// service layer to keep the controller lean and focused on managing requests.

const Transaction = require('../models/transactionModel');




class TransactionService {



  static async createTransactions(transactionsData, account){
    // check if the account is one of the accounts on the server first

    if(!transactionsData){
      throw new Error("(Service) Transaction data could not be found");
    }

    if(!account){
      throw new Error("(Service) Specified account could not be found");
    }

    try {
      const results = await Transaction.createTransactions(transactionsData, account);
      return results;

    } catch (error) {
      throw new Error(error);
    }
  }





  static async getTransactions(type, startDate, endDate){
    try {
      const transactionResults = await Transaction.getTransactions(type, startDate, endDate);
      return transactionResults;
    
    } catch (error){
      console.log("(service) error from getTransactions" + error);
      throw new error(error);
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