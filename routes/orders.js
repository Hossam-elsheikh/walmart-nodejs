const express = require('express');
let {auth} = require('../middlewares/auth');
let {createOrder , getOrderByIdCustomer, deleteOrder,updateOrder} = require('../controllers/orders');
const Router = express.Router();

Router.get('/',auth,getOrderByIdCustomer);
Router.post('/',auth,createOrder);
Router.patch('/',auth,updateOrder);
Router.delete('/',auth,deleteOrder);

module.exports = Router;
