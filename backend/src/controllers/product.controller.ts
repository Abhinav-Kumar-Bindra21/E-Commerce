import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model";

// function for add products

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files?.image1 && req.files?.image1[0];
    const image2 = req.files?.image2 && req.files?.image2[0];
    const image3 = req.files?.image3 && req.files?.image3[0];
    const image4 = req.files?.image4 && req.files?.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item != undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new Product(productData);

    await product.save();
    res.status(201).json({ success: true, message: "Product Added" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// function for list product
export const listProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({});
    res.status(200).json({ success: true, product });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Failed to fetch all records" });
  }
};

// function for removing product

export const removeProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product id is missing" });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Product Remove Successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: "Product Removing Failed" });
  }
};

// function for single product info
export const singleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product id is missing" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product is not present" });
    }

    res.status(200).json({ success: true, product });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: "Internal server error" });
  }
};
