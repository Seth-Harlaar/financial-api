const Account = require("../models/accountModel");
const TransactionService = require("./transactionService");




class AccountService {

  // *******************************************
  // ***         Create operations           ***
  // *******************************************

  static async createAccount(accountName, accountGroup){
    // validate the input data
    const validInput = true;

    if(!validInput){
      throw new Error("(service) Account information is incorrectly formatted.");
    }

    const uniqueAccountTitle = true;

    if(!uniqueAccountTitle){
      throw new Error("(service) That account name is already in use");
    }

    try {
      const createdAccount = await Account.createAccount(accountName, accountGroup);
      return createdAccount;

    } catch (error) {
      throw new Error(error);
    }

  }
  


  // *******************************************
  // ***          Get operations             ***
  // *******************************************

  static async getAccount(accountId){
    // validate the input data
    const validInput = true;

    if(!validInput){
      throw new Error("(service) Account information is incorrectly formatted.");
    }

    try {
      const foundAccount = await Account.getAccount(accountId);
      return foundAccount;

    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAccountsByGroup(accountGroup){
    // validate the input data
    const validInput = true;

    if(!validInput){
      throw new Error("(service) Account group information is incorrectly formatted.");
    }

    try {
      const foundAccounts = await Account.getGroupAccounts(accountGroup);
      return foundAccounts;

    } catch (error) {
      throw new Error(error);
    }
  }



  // *******************************************
  // ***         Update operations           ***
  // *******************************************

  static async updateAccount(accountId, accountData){
    // validate the input data
    const validInput = true;

    if(!validInput){
      throw new Error("(service) Account group information is incorrectly formatted.");
    }

    const uniqueAccountTitle = true;

    if(!uniqueAccountTitle){
      throw new Error("(service) That account name is already in use");
    }

    try {
      const updatedAccount = await Account.updateAccount(accountId, accountData);
      return updatedAccount;

    } catch (error) {
      throw new Error(error);
    }
  }



  // *******************************************
  // ***         Delete operations           ***
  // *******************************************

  static async deleteAccount(accountId){
    
    // find all transactions related
    const accountTransactions = await TransactionService.getTransactions(null, null, null, accountId);

    let deletedTransactions = 0;
    if(accountTransactions.count !== 0){
      const idsToDelete = accountTransactions.transactions.map((transaction) => {
        return transaction.dataValues.tranId;
      });

      deletedTransactions = await TransactionService.deleteTransactions(idsToDelete, accountId);
    }

    try {
      const deletedAccount = await Account.deleteAccount(accountId);
      return {
        "transactionsDeleted": deletedTransactions,
        "accountDeleted": deletedAccount,
      };

    } catch (error){
      throw new Error(error);
    }
  }
}










module.exports = AccountService;