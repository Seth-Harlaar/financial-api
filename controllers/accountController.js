const AccountService = require("../services/accountService");




class AccountController {

  // *******************************************
  // ***         Create operations           ***
  // *******************************************

  static async addAccount(req, res){

    const {title, group} = req.query;

    // check for required information
    if(!title){
      res.status(400).json({"error": "Bad request"});
      return;
    }

    // try to create the account
    try {
      const createdAccount = await AccountService.createAccount(title, group);
      res.status(201).json({createdAccount});
      
    } catch (error) {
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }



  // *******************************************
  // ***          Get operations             ***
  // *******************************************

  // for getting a specific account
  static async getAccount(req, res){
    
    const {accountId} = req.query;

    // check for required information
    if(!accountId){
      res.status(400).json({"error": "Bad request"});
      return;
    }

    // try to create the account
    try {
      const foundAccount = await AccountService.getAccount(accountId);
      res.status(201).json({foundAccount});
      
    } catch (error) {
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }

  // for getting all the accounts in a group
  static async getAccountByGroup(req, res){
    const {group} = req.query;

    // check for required information
    if(!group){
      res.status(400).json({"error": "Bad request"});
    }

    try {
      const foundAccounts = await AccountService.getAccountsByGroup(group);
      res.status(201).json({foundAccounts});
      
    } catch (error) {
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }
  
  
  
  // *******************************************
  // ***         Update operations           ***
  // *******************************************

  static async updateAccount(req, res){
    const {accountId} = req.query;
    const {accountData} = req.body;

    // check for required information
    if(!accountId || !accountData){
      res.status(400).json({"error": "Bad request"});
    }

    try {
      const updatedAccount = await AccountService.updateAccount(accountId, accountData);
      res.status(201).json({updatedAccount});
      
    } catch (error) {
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }
  
  
  
  // *******************************************
  // ***         Delete operations           ***
  // *******************************************

  static async deleteAccount(req, res){
    const {accountId} = req.query;

    // check for required information
    if(!accountId){
      res.status(400).json({"error": "Bad request"});
    }

    try {
      const deletedAccount = await AccountService.deleteAccount(accountId);
      res.status(201).json({deletedAccount});
      
    } catch (error) {
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }
}








module.exports = AccountController;