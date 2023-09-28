require('dotenv').config();
const customerModel = require('../models/Customers');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paymentModel = require('../models/Payment')


// !============> Simple Payment Form <==============
let paymentForm= async (req,res)=>{
    id = req.id
    role = req.role
    let totalPrice = 0 ;
    let payment = req.body;

    if(role !== "user") return res.status(401).json({message: 'You Are Not A User'});
    try{  
        let customer = await customerModel.findOne({_id : id})
        let newCart = customer.cart.map((pro)=>{
            let prodPrice = pro.price * pro.quantity;
            totalPrice += prodPrice;
            return totalPrice;
          });
        payment.customerCart = customer.cart;
        payment.customer_Id = customer._id;
        payment.phoneNumber = customer.phone;
        payment.email = customer.email;
        payment.full_name = customer.name
        payment.amount = totalPrice;
        let payInfo = await paymentModel.create(payment);
      
        res.status(200).json({message:'payment Sucessfully done', payInfo:payInfo});
    }catch(err){
        res.status(403).json({message: err.message});
    }
}

// ? get Customer Model Payment
let getPayment = async (req,res)=>{
    id = req.id;
    role = req.role;

    if(role !== "user") return res.status(401).json({message: 'You Are Not A User'});

    try{
        let payment = await paymentModel.findOne({customer_Id:id})
        console.log(payment);
        res.status(201).json({message:'payment successfully retrieved' , payment:payment})
    }catch(err){
        res.status(501).json({message:err.message})
    }
} 

module.exports = {paymentForm,getPayment}