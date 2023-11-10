import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { stripeGateway } from "../server.js";






const makePayment = asyncHandler(async (req, res) => {
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: "Nike Vercel",
                  images: ["https://firebasestorage.googleapis.com/v0/b/sneak-3b511.appspot.com/o/sneakerImages%2Fasset%2069.jpeg?alt=media&token=0c3368d6-0221-4280-adbc-8ec70a3f10fd"],
                },
                unit_amount:2000
              },
              quantity: 2,
            },
          
          ],
          
          
          
          
          
          shipping_address_collection: {
            allowed_countries: ['US',"IN"], 
        },
          
          
        mode: 'payment',
        success_url: 'https://ecommerce-frontend-psi-five.vercel.app/success',
        cancel_url: 'https://ecommerce-frontend-psi-five.vercel.app/error',
      });
    
      res.redirect(303,session.url)
    
})

export {makePayment}