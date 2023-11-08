import express from "express"
import { addItemCart, decrementItemCart, getCartItems, incrementItemCart, removeItemCart } from "../controllers/cartController.js"


const router = express.Router()

router.get("/get_items/:userId",getCartItems)
router.post("/add_item/:userId/:productId",addItemCart)
router.post("/increment_item/:userId/:productId",incrementItemCart)
router.post("/decrement_item/:userId/:productId",decrementItemCart)
router.delete("/remove_item/:userId/:productId",removeItemCart)




export default  router