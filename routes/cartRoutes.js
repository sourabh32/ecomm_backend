import express from "express"
import { addItemCart, decrementItemCart, getCartItems, incrementItemCart, removeItemCart } from "../controllers/cartController.js"


const router = express.Router()

router.get("/get_items/:userId",getCartItems)
router.post("/add_item",addItemCart)
router.post("/increment_item",incrementItemCart)
router.post("/decrement_item",decrementItemCart)
router.delete("/remove_item",removeItemCart)




export default  router