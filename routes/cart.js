const express = require('express');
let {auth} = require('../middlewares/auth')
let {getCart,deleteProduct,deletecart} = require('../controllers/cart')

const Router = express.Router();

Router.get('/',auth,getCart)

Router.patch('/:id',auth,deleteProduct)

Router.delete('/:id',auth,deletecart)


module.exports = Router;
