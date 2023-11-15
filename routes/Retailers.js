const express = require('express');
let {addNewRetailer,getAllRetailers,loginRetailer,editRetailerData , check} = require('../controllers/Retailers')
let {auth} = require('../middlewares/auth');
const Router = express.Router();


Router.get('/',getAllRetailers )

Router.post('/login',loginRetailer)

Router.post('/signup',addNewRetailer)

Router.patch('/',auth,editRetailerData)  

// ? check if retailer is found
Router.post('/check', check);

module.exports = Router