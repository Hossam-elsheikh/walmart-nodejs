const express = require('express');
let{getAllCustomers, signUp, login , logout ,delet, update,addcart} = require('../controllers/Customers');
const { auth } = require('../middlewares/auth');
const Router = express.Router();

// ? get all Customers
Router.get('/', getAllCustomers);

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

