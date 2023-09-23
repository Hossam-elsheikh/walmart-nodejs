const express = require('express');
let {addNewRetailer,getAllRetailers,loginRetailer,editRetailerData} = require('../controllers/Retailers')
let {auth} = require('../middlewares/auth')
const Router = express.Router();


Router.get('/',getAllRetailers )

Router.post('/login',loginRetailer)

Router.post('/signup',addNewRetailer)

Router.patch('/',auth,editRetailerData)  


module.exports = Router