import asyncHandler from "express-async-handler";

import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";

const getCartItems = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  res.status(200).json({ userId });
});
const addItemCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    const product = await Product.findById(productId);

    if (!cart || !product) {
      return res
        .status(404)
        .json({ message: "Resource not found", error: true });
    }

    const cartItem = cart.products.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity += 1;
      await cart.save();
      res.send(cart);
    }

    const newItem = {
      name: product.brand,
      productId,
      quantity: 1,
      sum: product.price,
    };

    if (cart) {
      cart.products.push(newItem);
      await cart.save();
      res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        products: [newItem],
      });
      res.status(200).json(newCart);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: true });
  }
});

const removeItemCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    const product = await Product.findById(productId);

    if (!cart || !product) {
      return res
        .status(404)
        .json({ message: "Resource not found", error: true });
    }
    const cartItem = cart.products.find((item) => item.productId === productId);

    if (cartItem) {
      cart.products = cart.products.filter(
        (item) => item.productId !== productId
      );
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(400).json({ message: "Item not Found!", error: true });
    }
  } catch (error) {
    res.status(400).json({ message: error.meassage, error: true });
  }
});



const decrementItemCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const cart = await Cart.findOne({ userId });
      const product = await Product.findById(productId);
  
      if (!cart || !product) {
        return res
          .status(404)
          .json({ message: "Resource not found", error: true });
      }
      const cartItem = cart.products.find((item) => item.productId === productId);
  
      if (cartItem) {
         if(cartItem.quantity === 1){
            cart.products = cart.products.filter(
                (item) => item.productId !== productId
              );
         }
         else{
            cartItem.quantity-=1
         }
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(400).json({ message: "Item not Found!", error: true });
      }
    } catch (error) {
      res.status(400).json({ message: error.meassage, error: true });
    }
  });

  const incrementItemCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const cart = await Cart.findOne({ userId });
      const product = await Product.findById(productId);
  
      if (!cart || !product) {
        return res
          .status(404)
          .json({ message: "Resource not found", error: true });
      }
      const cartItem = cart.products.find((item) => item.productId === productId);
  
      if (cartItem) {
         
            cartItem.quantity+=1
         
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(400).json({ message: "Item not Found!", error: true });
      }
    } catch (error) {
      res.status(400).json({ message: error.meassage, error: true });
    }
  });

export { getCartItems, removeItemCart, addItemCart,incrementItemCart,decrementItemCart };
