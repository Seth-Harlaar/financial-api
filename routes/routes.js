const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/transactionController');
const AccountController = require('../controllers/accountController');



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



// *******************************************
// ***           Account Routes            ***
// *******************************************

// create operations
router.post('/account/add', AccountController.addAccount);

// read operations
router.get('/account', AccountController.getAccount);
router.get('/account/group', AccountController.getAccountByGroup);

// update operations - only one account at a time
router.put('/account/update', AccountController.updateAccount);

// delete operations
router.delete('/account/rm', AccountController.deleteAccount);




// exports
module.exports = router;