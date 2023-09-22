const express = require('express');
let {addNewRetailer,getAllRetailers,loginRetailer} = require('../controllers/Retailers')
const Router = express.Router();


Router.get('/',getAllRetailers )

Router.post('/login',loginRetailer)

Router.post('/signup',addNewRetailer)

Router.patch('/',) 


module.exports = Router