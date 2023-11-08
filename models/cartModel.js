import mongoose from "mongoose"


const cartSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    products:[
        {
            productId:{
                type:String
            },
            name:{
                type:String
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },

            sum:{
                type:Number,
                default:0
            }
        }
    ]
})



const Cart = mongoose.model("Cart",cartSchema)


export default Cart