import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  addresses: [
    {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  ],
  orderHistory: [
    {
      date: Date,
      products: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: Number,
          price: Number,
        },
      ],
      totalAmount: Number,
    },
  ],
},);



const User  = mongoose.model("User",userSchema)

export default User
