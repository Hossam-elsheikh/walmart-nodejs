const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
let cartschema = mongoose.Schema({
    quentity:{
        type:Number,
        required:true
    },
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }
    ,
    customerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'    
    }
    
},{timestamps: true});



let cartmodel = mongoose.model('cart',cartschema);

module.exports = cartmodel ; 