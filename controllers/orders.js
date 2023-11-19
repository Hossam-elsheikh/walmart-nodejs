const customerModel = require("../models/Customers");
let { orderModel } = require("../models/orders");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


let createOrder = async (req, res) => {
  const { amount, value, cart } = req.body;
  let id = req.id;
  let role = req.role;
  if (role !== "user")
    return res.status(401).json({ message: "You Are Not A User" });
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    await orderModel.create({cart_Customer:cart,customer_Id:id});
    res.status(200).send(paymentIntent.client_secret);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let getOrderByIdCustomer = async (req, res) => {
  let customerId = req.id;
  try {
    let orders = await orderModel.find({ customer_Id: customerId });
    res
      .status(200)
      .json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// for seller 
let getOrderByRetailerID = async (req, res)=>{
  let retailerID = req.id;
  try {
    let allOrders = await orderModel.find();
    let orders=[]
    
    allOrders.forEach((order)=> {
        order.cart_Customer.forEach((item)=>{
          if (item.retailer_id == retailerID){
            orders.push({...item,customerID: order.customer_Id,orderID: order._id})
          }
        })
    })
    console.log(orders);
    res
      .status(200)
      .json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}
let updateOrder = async (req, res) => {
  order_id = req.params.id;
  let upStatus = req.body.status;
  try {
    let order = await orderModel.updateOne(
      { _id: order_id },
      { status: upStatus }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Status updated for order", order });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

let deleteOrder = async (req, res) => {
  order_id = req.params.id;
  try {
    let order = await orderModel.findOne({ _id: order_id });
    if (order) {
      if (order.status !== "shipping") {
        await orderModel.deleteOne({ _id: order_id });
        res.status(200).json({ message: "Delete order successfully" });
      } else {
        res
          .status(400)
          .json({ message: "Order is already shipped and cannot be deleted" });
      }
    } else {
      res.status(404).json({ message: "Order not found for the customer" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createOrder,
  getOrderByIdCustomer,
  deleteOrder,
  updateOrder,
  getOrderByRetailerID
};
