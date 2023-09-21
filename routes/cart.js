const express = require('express');
let{getallcart,add_cart,deletcart, update} = require('../controllers/cart')
const Router = express.Router();

Router.get('/', getallcart);


Router.post('/', add_cart);

Router.delete('/:id', deletcart);

//? logout
Router.patch('/:id', update);



module.exports = Router;

