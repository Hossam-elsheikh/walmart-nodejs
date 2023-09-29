const customerModel = require("../models/Customers");
let { orderModel } = require("../models/orders");

let createOrder = async (req, res) => {
  let order = req.body;
  order.customer_Id = req.id;
  let role = req.role;
  if (role !== "user") {
    return res.status(401).json({
      message:
        "You do not have permission to  create this order. please try again",
    });
  }
  try {
    let customer = await customerModel.findOne({ _id: order.customer_Id });
    order.cart_Customer = customer.cart;

    let newOrder = await orderModel.create(order);
    res
      .status(200)
      .json({ message: "order created successfully", order: newOrder });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

let getOrderByIdCustomer = async (req, res) => {
  let customerId = req.id;

  try {
    let orders = await orderModel.find({ customer_Id: customerId });
    res
      .status(200)
      .json({ message: `orders for customerId ${customerId}`, orders: orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
    let order = await orderModel.findOne({ _id: order_id});
    if (order) {
      if (order.status !== "shipped") {
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
};
