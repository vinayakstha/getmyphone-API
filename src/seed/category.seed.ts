import mongoose from "mongoose";
import dotenv from "dotenv";
import { CategoryModel } from "../models/category.model";

dotenv.config();

const categories = [
  { name: "Apple", image: "/uploads/categories/apple.png" },
  { name: "Samsung", image: "/uploads/categories/samsung.png" },
  { name: "Google", image: "/uploads/categories/google.png" },
  { name: "OnePlus", image: "/uploads/categories/oneplus.png" },
  { name: "Nothing", image: "/uploads/categories/nothing.jpeg" },
  { name: "Xiaomi", image: "/uploads/categories/xiaomi.png" },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDB");

    await CategoryModel.deleteMany({});
    console.log("Cleared existing categories");

    await CategoryModel.insertMany(categories);
    console.log("Categories seeded successfully");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();
