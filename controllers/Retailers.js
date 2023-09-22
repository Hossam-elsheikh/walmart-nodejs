let RetailerModel = require('../models/Retailer')
const jwt =require('jsonwebtoken')
const bcrypt = require('bcrypt')
let addNewRetailer= async (req,res)=>{
    let retailer = req.body
    try{
        let newRetailer = await RetailerModel.create(retailer)
        res.status(200).json({message:"retailer created successfully", data:newRetailer})
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

let getAllRetailers = async (req, res) => {
    try{
        let retailers = await RetailerModel.find()
        res.status(200).json({message:"retailers data successfully viewed", data: retailers})
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
    }
}

let loginRetailer = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message:'you must provide email and password'})
    }
    const retailer = await RetailerModel.findOne({email: email})
    if(!retailer){
        res.status(404).json({message:"wrong email or password"})
    }
    const isValid = await bcrypt.compare(password,retailer.password)
    if (!isValid){
        res.status(401).json({message:"wrong email or password"})
    }

    const token = jwt.sign({email:retailer.email,role:retailer.role,id:retailer._id},process.env.SECRET)
    res.status(200).json({message:"logged in successfully",token:token})
}


let editRetailerData = async (req,res)=>{
    let retailerID = req.id
    let {name,email,phone}= req.body
    try{
        let retailer = await RetailerModel.findOne({_id:retailerID})
        if(name){
            retailer.name = name
        }
        if(email){
            retailer.email = email
        }
        if(phone){
        retailer.phone = phone
        }
        res.status(200).json({message:"edited successfully",body:retailer})

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports = {addNewRetailer,getAllRetailers,loginRetailer,editRetailerData}