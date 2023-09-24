const express = require('express');
let {auth} = require('../middlewares/auth')
let {getCart,deleteProduct,emptyCart,editQuantity} = require('../controllers/cart')

const Router = express.Router();

Router.get('/',auth,getCart)

Router.patch('/:id',auth,deleteProduct)

Router.patch('/:id/:quantity',auth,editQuantity)

Router.delete('/',auth,emptyCart)


module.exports = Router;
