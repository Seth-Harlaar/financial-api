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

router.post('/account/add', AccountController.addAccount);

router.get('/account', AccountController.getAccount);
router.get('/account/group', AccountController.getAccountByGroup);


// exports
module.exports = router;