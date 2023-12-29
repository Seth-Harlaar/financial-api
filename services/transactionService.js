// Complex checks involving business logic or multiple steps are better handled in the 
// service layer to keep the controller lean and focused on managing requests.

const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');




class TransactionService {



  // *******************************************
  // ***         Create operations           ***
  // *******************************************
  
  static async createTransactions(transactionsData, accountId){
    // check if the account is one of the accounts on the server first
    
    if(!transactionsData){
      throw new Error("(service) Transaction data could not be found");
    }
    
    if(!accountId){
      throw new Error("(service) Account id could not be found");
    }
    
    const validAccount = await Account.getAccount(accountId);

    if(!validAccount){
      throw new Error("(service) Requested account could not be found");
    }

    try {
      const results = await Transaction.createTransactions(transactionsData, accountId);
      return results;

    } catch (error) {
      throw new Error(error);
    }
  }



  // *******************************************
  // ***          Get operations             ***
  // *******************************************

  static async getTransactions(type, startDate, endDate, accountId){
    // check that the account is a valid account if not throw service error

    const validAccount = await Account.getAccount(accountId);

    if(validAccount.length !== 1){
      throw new Error("(service) That account could not be found");
    }
    
    try {
      const transactionResults = await Transaction.getTransactions(type, startDate, endDate, accountId);
      return transactionResults;
    
    } catch (error){
      throw new Error(error);
    }
  }

  // *******************************************
  // ***         Update operations           ***
  // *******************************************

  static async updateTransactions(idsToUpdate, tranData){
    
    try {
      const updateTransactions = await Transaction.updateTransactions(idsToUpdate, tranData);
      return updateTransactions;

    } catch (error){
      throw new Error(error);
    }
  }



  // *******************************************
  // ***         Delete operations           ***
  // *******************************************

  static async deleteTransactions(idsToDelete, accountId){
    
    if(idsToDelete.length <= 0){
      throw new Error("(service) no input ids were found");
    }

    try {
      const deletedTransactions = await Transaction.deleteTransactions(idsToDelete, accountId);
      return deletedTransactions;

    } catch (error){
      throw new Error(error);
    }


  }
}



// exports
module.exports = TransactionService;