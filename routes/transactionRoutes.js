const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');



// *******************************************
// ***         Transaction Routes          ***
// *******************************************

// create operations
router.post('/transaction/add', TransactionController.addTransactionMultiple);

// read operations
router.get('/transaction', TransactionController.getTransactions);

// update operations
router.put('/transaction/update', TransactionController.udpateTransactionsMultiple);

// delete operations
router.delete('/transaction/rm', TransactionController.deleteTransactionMultiple);



// exports
module.exports = router;