// Simple checks or those closely related to the request-response cycle can be handled in the controller.

const TransactionService = require('../services/transactionService');

class TransactionController {


  // *******************************************
  // ***         Create operations           ***
  // *******************************************

  static async addTransactionMultiple(req, res){
    const {transactions} = req.body;
    const {accountId} = req.query;

    // code 422 for incorrect values

    // check for transactions
    if(!transactions || !accountId){
      res.status(400).json({"error": "Bad request"});
      return;
    }

    // try to create the transactions
    try {
      const createdTransactions = await TransactionService.createTransactions(transactions, accountId);
      
      res.status(201).json({ createdTransactions });

    } catch(error) {
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }



  // *******************************************
  // ***          Get operations             ***
  // *******************************************

  // one get to rule them all
  static async getTransactions(req, res){
    const {type, startDate, endDate, accountId} = req.query;
    
    if(!accountId){
      res.status(400).json({"error": "Bad request"});
      return;
    }

    // valide inputs
    const errorFromValidator = false;

    if(errorFromValidator){
      res.status(422).json({"error": "Invalid request query format"});
      return;
    }

    try {
      const transactions = await TransactionService.getTransactions(type, startDate, endDate, accountId);
      res.status(200).json({ transactions });

    } catch (error){
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }



  // *******************************************
  // ***        Update operations            ***
  // *******************************************

  static async udpateTransactionsMultiple(req, res){
    const {ids, newTrans} = req.body;

    if(!ids || !newTrans){
      res.status(400).json({"error": "Bad request"});
      return;
    }

    try {
      const updatedTransactions = await TransactionService.updateTransactions(ids, newTrans);
      res.status(200).json({updatedTransactions});

    } catch (error){
      res.status(500).json({"error": "Internal Server Error", "message": error.message });
    }
  }



  // *******************************************
  // ***         Delete operations           ***
  // *******************************************

  static async deleteTransactionMultiple(req, res){
    const {ids} = req.body;
    const {accountId} = req.query;

    if(!ids){
      res.status(400).json({"error": "Bad request"});
      return;
    }

    try {
      const deletedTransactions = await TransactionService.deleteTransactions(ids, accountId);
      res.status(200).json({ deletedTransactions });

    } catch(error) {
      res.status(500).json({"error": "Internal Server Error", "message": error.message });
    }
  }
}



// exports
module.exports = TransactionController;