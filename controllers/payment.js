require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paymentModel = require('../models/Payment')

let paymentForm= async (req,res)=>{
    id = req.id
    role = req.role
    
    let payment = req.body;

    if(role !== "user") return res.status(401).json({message: 'You Are Not A User'});
    try{
        
    let payInfo =await paymentModel.create(payment)
    
    res.status(200).json({message:'payment Sucessfully done', payInfo:payInfo});
    }catch(err){
        res.status(403).json({message: err.message});
    }

}

module.exports = {paymentForm}