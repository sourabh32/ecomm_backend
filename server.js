import express, { urlencoded } from "express"
import dotenv from "dotenv"
import { connectDb } from "./utils/dbConfig.js"
import cors from "cors"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
dotenv.config()
connectDb()








const app = express()
app.use(cors())

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use("/api",productRoutes)
app.use("/api/user",userRoutes)
app.use("/api/cart",cartRoutes)
app.get("/",(req,res)=>{
    res.send("hello ecomm")
})



app.listen(3000,()=>{
    console.log("Server is listening at 3000")
})