const express = require('express');
let {auth} = require('../middlewares/auth');
let {createOrder , getOrderByIdCustomer, deleteOrder,updateOrder,getOrderByRetailerID} = require('../controllers/orders');
const Router = express.Router();

Router.get('/',auth,getOrderByIdCustomer);
Router.get('/all',auth,getOrderByRetailerID);
Router.post('/',auth,createOrder);
Router.patch('/:id',auth,updateOrder);
Router.delete('/:id',auth,deleteOrder);
module.exports = Router;
