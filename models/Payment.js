const { mongoose } = require("mongoose");
const paymentSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    customerCart:{
      type:Array,
    },
    amount: {
      type: Number,
      required: true,
    },
    cardNumber: {
      type: String,
      default:'card',
      required: true,
    },
    phoneNumber:{
      type:String,
      // required:true,
      unique:true,
      VarDate:function(v){
          return /^[0-9]{11}$/.test(v);
      },
      message : props=> `${props.value} is not a valid phone number..!`
  },
    currrency: {
      type: String,
      dafault: "usd",
      required: true,
    },
    customer_Id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Customer"
    },
   
},
{ timestamps: true });

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = paymentModel;
