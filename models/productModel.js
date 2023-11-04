import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
     
    },
    price: {
      type: Number,
      required: true,
    },
    review: {
      type: Number,
      required: true,
    },
  });
  
  
  const Product = mongoose.model('Product', productSchema);

  export default Product