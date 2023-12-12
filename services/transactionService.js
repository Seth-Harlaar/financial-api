// Complex checks involving business logic or multiple steps are better handled in the 
// service layer to keep the controller lean and focused on managing requests.

const Transaction = require('../models/transactionModel');




class TransactionService {



  // *******************************************
  // ***         Create operations           ***
  // *******************************************
  
  static async createTransactions(transactionsData, account){
    // check if the account is one of the accounts on the server first

    if(!transactionsData){
      throw new Error("(service) Transaction data could not be found");
    }

    if(!account){
      throw new Error("(service) Specified account could not be found");
    }

    try {
      const results = await Transaction.createTransactions(transactionsData, account);
      return results;

    } catch (error) {
      throw new Error(error);
    }
  }



  // *******************************************
  // ***          Get operations             ***
  // *******************************************

  static async getTransactions(type, startDate, endDate, account){
    // check that the account is a valid account if not throw service error

    const validAccount = true;

    if(!validAccount){
      throw new Error("(service) The request account could not be found");
    }
    
    try {
      const transactionResults = await Transaction.getTransactions(type, startDate, endDate, account);
      return transactionResults;
    
    } catch (error){
      throw new Error(error);
    }
  }



  // *******************************************
  // ***         Delete operations           ***
  // *******************************************

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



// exports
module.exports = TransactionService;