let mongoose = require('mongoose')

let ProductSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength:6,

    },
    price:{
        type:Number,
        required: true
    },
    discount:{
        type: Number,
    },
    quantity:{
        type : Number,
        default: 1
    },
    department:{
        type: String,
        ref:"Department"
    },
    spec:{
        type: String,
    },
    
    rating:{
        type: Number
    },
    retailer_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Retailer'
    }
},{timestamps:true})

const productModel = mongoose.model('Product',ProductSchema)
module.exports = productModel