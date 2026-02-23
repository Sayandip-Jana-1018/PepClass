import { products } from "../models/productModel.js";
const getProducts = (req, res) => {
  res.json(products)
};

const addProduct = (req, res) => {
  res.send("This is post request of product router");
};

export { getProducts, addProduct };
