const express = require('express');
let{getAllCustomers, signUp, login , logout} = require('../controllers/Customers')
const Router = express.Router();

// ? get all Customers
Router.get('/', getAllCustomers);

// ? signUp customer
Router.post('/signup', signUp);

// ? login Customer
Router.post('/login', login);

//? logout
Router.patch('/logout', logout);


module.exports = Router;

