let customerModel = require('../models/Customers');
const jwt =require('jsonwebtoken')
const axios = require('axios')
// ? get all customers
let getAllCustomers =async (req,res)=>{
try{
    let customers = await customerModel.find().populate(cart_Id);
    console.log(customers);
    res.status(200).json({customers});
}catch(err){
    res.status(500).json("Something Went Wrong..! );");
}
}
// ? signup first time
let signUp =async (req,res)=>{
    let customer = req.body
    try{
        let newCustomer =await customerModel.create(customer);
       
        res.status(201).json({message:"customer saved successfully",data:newCustomer})
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

// ? log in customer
let login = async (req ,res)=>{
    let {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({message:"email and password are required"});
    }else{
        try{
            let customer = await customerModel.findOne({email:email});
            if(customer){
                if(customer.password === password){
                    //* generate token
                    console.log(customer.role);
                    const token =  jwt.sign({id:customer._id , name:customer.name , role:customer.role},process.env.SECRET,{expiresIn:'1h'});
                    res.status(200).json({message:"login successfull",data:customer,token});
                }else{
                    res.status(400).json({message:"password is wrong"});
                }
            }else{
                res.status(400).json({message:"email is wrong"});
            }
        }catch(err){
            res.status(500).json({message:err.message});
        }
    }
   
}

//? logout from 
let logout = async (req ,res)=>{
    let token = req.headers.authorization;
    if(token){
      
        let decoded = jwt.verify(token,process.env.SECRET,(err,decoded)=>{
        
            if(err){
                res.status(400).json({message:"token is invalid",});
            }else{
                console.log(delete axios.defaults.headers.common['Authorization']);
            //    axios.defaults.headers.delete["Authorization"];
                
                res.status(200).json({message:"logout successfull"});
                
            }
        })

    }else{
        res.status(400).json({message:"You Are Not Loged IN"});
    }
}

module.exports = {getAllCustomers,signUp,login,logout};