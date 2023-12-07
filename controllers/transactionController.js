// Simple checks or those closely related to the request-response cycle can be handled in the controller.

const TransactionService = require('../services/transactionService');

class TransactionController {


  
  // one get to rule them all
  static async getTransactions(req, res){
    const {type, startDate, endDate } = req.query;

    // valide inputs

    const errorFromValidator = false;

    if(errorFromValidator){
      res.status(400).json({"error": "Bad request"});
    }

    try {
      const transactions = await TransactionService.getTransactions(type, startDate, endDate);
      res.status(200).json({ transactions });

    } catch (error){
      res.status(500).json({ "error": 'Internal Server Error', "message": error });
    }
  }



  // create 
  static async addTransactionMultiple(req, res){
    const {transactions} = req.body;

    // code 422 for incorrect

    // check for transactions
    if(!transactions){
      res.status(400).json({"error": "Bad request"});
    }

    // issue promise for uploading all transactions
    try {
      const createdTransactions = await TransactionService.createTransactions(transactions);
      
      res.status(201).json({ createdTransactions });

    } catch(error) {
      res.status(500).json({ "error": 'Internal Server Error', "message": error });
    }
  }


  // read operations

  


  // requires a "type" of either "debit" or "credit" - if none defaults to get all
  static async getTransactionsByType(req, res) {
    const {type} = req.query;

    try {
      let transactions;
      
      if(type == "debit" || type == "credit"){
        transactions = await TransactionService.getTransactionsByType(type);
      } else {
        // default to all transactions instead of error
        transactions = await TransactionService.getAllTransactions();
      }

      res.status(200).json({ transactions });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error });
    }
  }

  static async getTransactionsBySpecificDate(req, res){
    const {type, dateString} = req.query;

    // type must match and dateString must be there
    if(type == "day" || type == "month" || type == "year" && dateString){
      try {
        const transactions = await TransactionService.getTransactionsBySpecificDate(type, dateString);
        res.status(200).json({ transactions });
      } catch (error) {
        res.status(500).json({"error": "Internal Server Error", "message": error });
      }
    } else {
      res.status(400).json({"error": "Bad request"});
    }
  }

  static async getTransactionsByRangeDate(req, res){
    const {startDate, endDate} = req.query;

    // one must be present
    if(startDate || endDate){
      try {
        const transactions = await TransactionService.getTransactionsByRangeDate(startDate, endDate);
        res.status(200).json({ transactions });
      } catch {
        res.status(500).json({"error": "Internal Server Error", "message": error });
      }
    } else {
      res.status(400).json({"error": "Bad request"});
    }
  }


  static async deleteTransactionMultiple(req, res){
    const {ids} = req.body;

    if(!ids){
      res.status(400).json({"error": "Bad request"});
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

module.exports = TransactionController;