let mongoose = require('mongoose')

let ProductSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        minLength:6,

    },
    description:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true
    },
    discountPercentage:{
        type:Number,
        required:true
    },
    quantity:{
        type: Number,
        default:1
    },
    discount:{
        type: Number,
    },
    stock:{
        type : Number,
        default: 300
    },
    department:{
        type: String,
        ref:"Department"
    },
    brand:{
        type:String,
    },
    spec:{
        type: String,
    },
    rating:{
        type: Number
    },
    category:{
        type:String,
    },
    thumbnail:{
        type:String
    },
    images:{
        type:Array
    },
    retailer_id:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Retailer'
    },
    favorite:{
        type:Boolean,
    }
},{timestamps:true})

const productModel = mongoose.model('Product',ProductSchema)
module.exports = productModel