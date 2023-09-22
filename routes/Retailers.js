const express = require('express');
let {addNewRetailer,getAllRetailers,loginRetailer,editRetailerData} = require('../controllers/Retailers')
let {retailerAuth} = require('../middlewares/retailerAuth')
const Router = express.Router();


Router.get('/',getAllRetailers )

Router.post('/login',loginRetailer)

Router.post('/signup',addNewRetailer)

Router.patch('/',retailerAuth,editRetailerData)  


module.exports = Router