import express from "express"
import { makePayment } from "../controllers/checkoutController.js"


const router = express.Router()

router.get("/checkout",makePayment)




export default  router