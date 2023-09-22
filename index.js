const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

let customerRoute = require ('./routes/Customers.js')
let retailerRoute = require('./routes/Retailers.js')
let cartrouter = require ('./routes/cart.js')

// ? ==> Creating app <==
const app = express();

// !======> the order of middlewares is important <=======
// ? ==> middleware <==
app.use(express.json()) // any req will transform into js fromat
// ?===> cors middleware error handling <==
app.use(cors({
    origin:'*'
}))
// !-----------------------------------------------------------------------
app.use('/customer',customerRoute);
app.use('/retailer',retailerRoute);



// !-----------------------------order(cart)------------------------------------------
app.use('/cart',customerRoute)
app.use('/mycart',cartrouter) 


// !--------------------------- error handling middleWares-----------------------------------
// ? Not Found MiddleWare
app.use('*',function(req,res,next){
    res.status(404).json({messge:"Not Found"});
});
// ? error handling middleware
app.use(function(err,req,res,next){
    res.status(500).json({messge:"something Went Wrong..!",error:err});
});
// !-------------------------------------------------------------
// ?====> Connect to MongoDB <=======
mongoose.connect('mongodb://127.0.0.1:27017/WalmartDB').then(()=>{
    console.log('Conected to Mongo DB Successefully');
}).catch((err)=>{
    console.log(err);
})
// ?=====> Connect to server Port <=====
app.listen(3333, ()=>{
    console.log('listening on port 3333');
})