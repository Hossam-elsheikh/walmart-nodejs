const express = require('express');
let{getAllCustomers, signUp, login , logout ,delet, update,addcart ,check } = require('../controllers/Customers');
const { auth } = require('../middlewares/auth');
const Router = express.Router();

// ? get all Customers
Router.get('/', getAllCustomers);

// ? check if customer is found
Router.post('/check', check);

// ? signUp customer
Router.post('/signup', signUp);

// ? login Customer
Router.post('/login', login);

//? logout
Router.patch('/logout',auth, logout);   

//? delete
Router.delete('/delete/:id', auth , delet);

//? update
Router.patch('/update',auth, update);

module.exports = Router;

