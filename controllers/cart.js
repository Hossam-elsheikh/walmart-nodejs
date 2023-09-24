let customerModel = require("../models/Customers");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let getCart = async (req, res) => {
  let id = req.id;
  let role = req.role;
  if (role !== "user") {
    return res.status(401).json({ message: "login as a user" });
  }

  try {
    let customer = await customerModel.findOne({ _id: id });
    res
      .status(200)
      .json({ message: "cart successfully retrieved", cart: customer.cart });
  } catch (err) {
    res.status(500).json({ message: "something went wrong, try again" });
  }
};

let deleteProduct = async (req, res) => {
  let id = req.id;
  let role = req.role;
  let product_id = req.params.id;
  if (role !== "user") {
    return res.status(401).json({ message: "login as a user" });
  }
  try {
    let customer = await customerModel.findOne({ _id: id });
    let newCart = customer.cart.filter((p) => p._id != product_id);
    let updatedCustomer = await customerModel.updateOne(
      { _id: id },
      { $set: { cart: newCart } }
    );
    res
      .status(200)
      .json({ message: "product successfully deleted", cart: updatedCustomer });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


let emptyCart = async (req, res) => {
  let id = req.id;
  let role = req.role;
  if (role !== "user") {
    return res.status(401).json({ message: "login as a user" });
  }
  try {
    await customerModel.updateOne({ _id: id }, { $set: { cart: [] } });
    res.status(200).json({ message: "cart is empty now" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

let editQuantity = async (req,res) => {

}


module.exports = { getCart, deleteProduct, emptyCart ,editQuantity};
