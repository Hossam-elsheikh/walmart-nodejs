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
    amount: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    currrency: {
      type: String,
      dafault: "usd",
      required: true,
    },
    customerId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "customercart",
    },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = paymentModel;
