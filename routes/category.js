const express = require('express');
let {getCategory} = require('../controllers/category')
const Router = express.Router();

Router.get('/:category',getCategory) 


module.exports = Router