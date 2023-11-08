import express from "express"
import { getProducts, getproduct } from "../controllers/productController.js"

const router = express.Router()

router.post("/products",getProducts)
router.post("/product",getproduct)



export default  router