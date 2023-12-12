// Simple checks or those closely related to the request-response cycle can be handled in the controller.

const TransactionService = require('../services/transactionService');

class TransactionController {


  // *******************************************
  // ***         Create operations           ***
  // *******************************************

  static async addTransactionMultiple(req, res){
    const {transactions} = req.body;
    const {account} = req.query;

    // code 422 for incorrect values

    // check for transactions
    if(!transactions || !account){
      res.status(400).json({"error": "Bad request"});
      return;
    }

    // issue promise for uploading all transactions
    try {
      const createdTransactions = await TransactionService.createTransactions(transactions, account);
      
      res.status(201).json({ createdTransactions });

    } catch(error) {
      console.log(error);
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }



  // *******************************************
  // ***          Get operations             ***
  // *******************************************

  // one get to rule them all
  static async getTransactions(req, res){
    const {type, startDate, endDate, account} = req.query;
    
    if(!account){
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
      const transactions = await TransactionService.getTransactions(type, startDate, endDate, account);
      res.status(200).json({ transactions });

    } catch (error){
      res.status(500).json({ "error": "Internal Server Error", "message": error.message });
    }
  }



  // *******************************************
  // ***         Delete operations           ***
  // *******************************************

  static async deleteTransactionMultiple(req, res){
    const {ids} = req.body;

    if(!ids){
      res.status(400).json({"error": "Bad request"});
      return;
    }

    try {
      const deletedTransactions = await Promise.all(
        ids.map(async (id) => {
          await TransactionService.deleteTransaction(id);
        })
      );
      
      res.status(200).json({ deletedTransactions });

    } catch(error) {
        res.status(500).json({"error": "Internal Server Error", "message": error });
    }

  }
}



// exports
module.exports = TransactionController;