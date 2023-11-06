const express = require('express');
let {auth} = require('../middlewares/auth')
let {addToCart,addProduct,getAllProducts,editProduct,deleteProduct,getRetailerProducts,getByCat,getProductById} = require('../controllers/product')
const Router = express.Router();

// important 
Router.get('/',auth,getRetailerProducts) // when retailer gets all products

Router.get('/all',getAllProducts) // when anyone gets all products

Router.get('/:category',getByCat) // when anyone gets by category 

Router.post('/',auth,addProduct) // when retailer add a product

Router.get('/details/:id',getProductById)  // when anyone gets Product By Id

Router.post('/:id',auth,addToCart) // when user add to cart 

Router.patch('/:id',auth,editProduct) // when retailer edit a product

Router.delete('/:id',auth,deleteProduct) // when retailer delete a product

module.exports = Router