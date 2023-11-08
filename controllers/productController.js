import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getProducts = asyncHandler(async (req, res) => {
  try {
    const { category, sort, lower, higher, brands } = req.body;
    console.log(category, sort, lower, higher, brands);
    const page = req.body.page || 1;
    const limit = req.body.limit || 5;
    const minPrice = lower || 0;
    const maxPrice = higher || 200;
    const val = category || "";
    let query = {
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
      category: val,
    };

    if (brands && brands.length > 0) {
      query.brand = { $in: brands.map((brand) => new RegExp(brand, "i")) };
    }

    let sortQuery = {};
    if (sort) {
      const [field, order] = sort.split(":");

      sortQuery[field] = order.toString() === "asc" ? 1 : -1;
    } else {
      sortQuery["price"] = 1;
    }
    const skip = (page - 1) * limit;

    const aggregatePipeline = [
      { $match: query },
      { $sort: sortQuery },
      { $skip: skip },
      { $limit: limit },
    ];

    const products = await Product.aggregate(aggregatePipeline);

    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message, error: true });
  }
});



const getproduct = asyncHandler(async(req,res)=>{


  const {id} = req.body

  try {
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
      
    res.status(500).json({ message: "Product not found", error: true });
  }
  
})

export { getProducts,getproduct };
