import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"

const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body

    try {
        const user =  await User.findOne({email})
        if(!user){
            res.status(404).json({ message: "User not found!" }); 
        }
        const authenticate = await bcrypt.compare(password,user.password)
        if(!authenticate){
            res.status(404).json({ message: "Password do not match!" }); 
        }

        res.status(200).json(user)

        

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });

    }
})


const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body
    try {
        const userExists = await User.findOne({email})
        if(userExists){
            res.status(401).json({ message: "User already registerd" }); 
        }
        

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password,salt)
        const user = await User.create({
            username,
            email,
            password:hashed,
          });

          res.status(200).json(user)
          


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


export {authUser,registerUser}