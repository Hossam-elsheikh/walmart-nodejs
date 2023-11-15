const mongoose = require('mongoose');
let orderSchema = mongoose.Schema({
    status:{
        type :String,
        enum:["delivered" , "shipping" ,"Pending"],
        default : "Pending",
    },
   customer_Id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Customer',
    },
    cart_Customer:{
        type:Array
    },

},{timestamps: true,
})

let orderModel = mongoose.model('order',orderSchema);
module.exports = {orderModel};
