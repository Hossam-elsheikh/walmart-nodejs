const express = require('express');
const { auth } = require('../middlewares/auth');
const {paymentForm} = require('../controllers/payment')
const Router = express.Router();

// ? get 
// Router.get('/', getAllCustomers);

// ? 
Router.post('/',auth ,paymentForm);

module.exports = Router;

