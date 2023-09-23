let productModel = require("../models/Product");
let customerModel = require("../models/Customers");

let addToCart = async (req, res) => {
  let product_id = req.params.id;
  let customer_id = req.id;
  let role = req.role;
  if (role !== "user") {
    res.status(401).json({ message: "please login first to add to cart" });
  }
  try {
    let customer = await customerModel.findOne({ _id: customer_id });
    let product = await productModel.findOne({ _id: product_id });
    customer.cart = [...customer.cart, product];
    res
      .status(200)
      .json({ message: "successfully added to cart", cart: customer.cart });
  } catch (err) {
    // if it's a retailer won't be able to add it to the cart
    res.status(401).json({ message: "login first to add to cart" });
  }
};
let addProduct = async (req, res) => {
  // add product and assign retailer_id to it
  let retailer_id = req.id;
  let product = req.body;
  product.retailer_id = retailer_id;
  let role = req.role;
  if (role !== "retailer") {
    res
      .status(401)
      .json({
        message:
          "you're not allowed to add a product, please login as a retailer",
      });
  }
  try {
    let newProduct = await productModel.create(product);
    res
      .status(200)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

let getAllProducts = async (req, res) => {
  // Get all products by this retailer
  let retailer_id = req.id;
  let role = req.role;
  if (role !== "retailer") {
    res
      .status(401)
      .json({
        message:
          "you're not allowed to add a product, please login as a retailer",
      });
  }
  let products = await productModel.find({ retailer_id: retailer_id });
  if (!products) {
    res.status(401).json({ message: "Products not found" });
  }
  res
    .status(200)
    .json({ message: "Products successfully retrieved", products: products });
};

let editProduct = async (req, res) => {
  let product_id = req.params.id;
  let retailer_id = req.id;
  let role = req.role;
  if (role !== "retailer") {
    res
      .status(401)
      .json({
        message:
          "you're not allowed to add a product, please login as a retailer",
      });
  }
  // edit product added by certain retailer
  try {
    let product = await productModel.updateOne(
      { _id: product_id, retailer_id: retailer_id },
      {
        title: req.body.title,
        price: req.body.price,
        discount: req.body.discount,
      }
    );
    if (!product) {
      res.status(401).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product edited successfully" });
  } catch (err) {
    res.status(401).json({ message: "editing failed" });
  }
};
let deleteProduct = async (req, res) => {
  let product_id = req.params.id;
  let retailer_id = req.id;
  // delete product from retailer store
  let role = req.role;
  if (role !== "retailer") {
    res
      .status(401)
      .json({
        message:
          "you're not allowed to add a product, please login as a retailer",
      });
  }
  try {
    let resolved = await productModel.deleteOne({
      _id: product_id,
      retailer_id: retailer_id,
    });
    if (resolved.deletedCount === 0) {
      res.status(401).json({ message: "failed to delete product" });
    } else {
      res.status(200).json({ message: "Product deleted successfully" });
    }
  } catch (err) {
    res.status(401).json({ message: "failed to delete product" });
  }
};
module.exports = {
  addToCart,
  getAllProducts,
  addProduct,
  editProduct,
  deleteProduct,
};
