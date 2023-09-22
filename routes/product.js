const express = require('express');
let {retailerAuth} = require('../middlewares/retailerAuth')
let {addProduct,getAllProducts,editProduct,deleteProduct} = require('../controllers/product')
const Router = express.Router();


Router.get('/',retailerAuth,getAllProducts)

Router.post('/',retailerAuth,addProduct)

Router.patch('/:id',retailerAuth,editProduct)

Router.delete('/:id',retailerAuth,deleteProduct)

module.exports = Router