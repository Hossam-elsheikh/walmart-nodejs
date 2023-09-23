const express = require('express');
let {auth} = require('../middlewares/auth')
let {addToCart,addProduct,getAllProducts,editProduct,deleteProduct} = require('../controllers/product')
const Router = express.Router();


Router.get('/',auth,getAllProducts) // when retailer gets all products

Router.post('/',auth,addProduct) // when retailer add a product

Router.post('/:id',auth,addToCart) // when user add to cart 

Router.patch('/:id',auth,editProduct) // when retailer edit a product

Router.delete('/:id',auth,deleteProduct) // when retailer delete a product

module.exports = Router