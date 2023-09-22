const express = require('express');
let{getAllCustomers, signUp, login , logout ,delet, update,addcart} = require('../controllers/Customers')
const Router = express.Router();

// ? get all Customers
Router.get('/', getAllCustomers);

// ? signUp customer
Router.post('/signup', signUp);

// ? login Customer
Router.post('/login', login);

//? logout
Router.patch('/logout', logout);

//? delete
Router.delete('/delete/:id', delet);

//? update
Router.patch('/update', update);


Router.post('/', addcart);        //cart with embeded

module.exports = Router;

