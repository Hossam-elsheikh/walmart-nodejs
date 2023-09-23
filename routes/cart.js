const express = require('express');
let {auth} = require('../middlewares/auth')
let {getCart,deleteProduct} = require('../controllers/cart')

const Router = express.Router();

Router.get('/',auth,getCart)

Router.delete('/:id',auth,deleteProduct)

module.exports = Router;
