const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');

// TRANSACTION ROUTES
// create operations
router.post('/transaction/multiple', TransactionController.addTransactionMultiple);

// read operations
router.get('/transactionsType', TransactionController.getTransactionsByType);
router.get('/transactionsSpecificDate', TransactionController.getTransactionsBySpecificDate);
router.get('/transactionsRangeDate', TransactionController.getTransactionsByRangeDate);

// delete operations
router.delete('/transaction/multiple', TransactionController.deleteTransactionMultiple);

// REPORT ROUTES


module.exports = router;