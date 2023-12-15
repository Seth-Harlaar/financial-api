const Account = require("../models/accountModel");




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

  static async getAccount(accountTitle){
    // validate the input data
    const validInput = true;

    if(!validInput){
      throw new Error("(service) Account information is incorrectly formatted.");
    }

    try {
      const foundAccount = await Account.getAccount(accountTitle);
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
}



module.exports = AccountService;