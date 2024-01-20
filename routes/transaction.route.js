const express = require('express');
const {carRentalTransaction,carRentalTransactionById} = require('../controllers/transactionCar.controller')
const TransactionRoute = express.Router();
TransactionRoute.post('/transactions',carRentalTransaction);
TransactionRoute.get('/transactions/:id',carRentalTransactionById)
module.exports = TransactionRoute