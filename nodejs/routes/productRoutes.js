import express from "express"
import { addProduct,getProducts } from "../controllers/productController.js"
const productRouter = express.Router()
productRouter.get("/",getProducts)
productRouter.post("/",addProduct)
export default productRouter