const express = require('express');
const { auth } = require('../middlewares/auth');
const {paymentForm,getPayment} = require('../controllers/payment')
const Router = express.Router();

// ? get 
Router.get('/', auth,getPayment);

// ? 
Router.post('/',auth ,paymentForm);



module.exports = Router;

