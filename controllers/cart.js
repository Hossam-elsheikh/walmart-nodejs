let cartmodel = require('../models/cart');
const jwt =require('jsonwebtoken')
const axios = require('axios');
const bcrypt = require('bcrypt');


const cartschema = require('../models/cart');

// ? get all cart
let getallcart =async (req,res)=>{
try{
    let carts = await cartmodel.find();
    console.log(carts);
    res.status(200).json({carts});
}catch(err){
    res.status(500).json("Something Went Wrong..! );");
}
}

// add cart
let add_cart =async (req,res)=>{
    let cart = req.body
    try{
        let newcart =await cartschema.create(cart);
       
        res.status(201).json({message:"cart saved successfully",data:newcart})
    }catch(err){
        res.status(400).json({message:err.message});
    }
}


//? delete
let deletcart =async (req, res)=>{
    
    let {id} = req.params
    console.log(id); 
try{
    let cart = await cartschema.findOne({_id:id});
    // console.log(customer);
    if(cart){
        await cartschema.deleteOne({_id:cart._id});
        res.status(200).json({message:"cart deleted succeesfully",data:cart});
    }else{
        res.status(404).json({message:"cart not found"});
    }
}catch(err){
    res.status(500).json({message:err.message});
}
}

//? update 
let update =async (req, res) => {
    
    try{
    
          
            let cart = await cartschema.findOne({_id:cart._id})
            
            let updatedcart = await cartschema.updateOne({_id:cart.id})
            console.log(updatedcart);
            res.status(200).json({message:"updated your data successfully"})
            
        }
    catch(err){
        res.status(500).json({message:err.message})
        console.log(err.message);
    }
}



module.exports = {getallcart,add_cart,deletcart, update};