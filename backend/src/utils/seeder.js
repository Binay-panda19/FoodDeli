import dotenv from "dotenv";
import FoodItem from "../models/FoodItem.js";

dotenv.config();

const foods = [
  { name: "Veg Biryani", price: 180, category: "Biryani", image: "food_1" },
  {
    name: "Hyderabadi Biryani",
    price: 240,
    category: "Biryani",
    image: "food_2",
  },
  { name: "Mutton Biryani", price: 320, category: "Biryani", image: "food_3" },
  { name: "Egg Biryani", price: 200, category: "Biryani", image: "food_4" },

  { name: "Paneer Pizza", price: 260, category: "Pizza", image: "food_5" },
  { name: "Chicken Pizza", price: 300, category: "Pizza", image: "food_6" },
  { name: "Classic Pizza", price: 220, category: "Pizza", image: "food_7" },
  { name: "BBQ Pizza", price: 340, category: "Pizza", image: "food_8" },

  {
    name: "Ripple Ice Cream",
    price: 120,
    category: "Desserts",
    image: "food_9",
  },
  {
    name: "Fruit Ice Cream",
    price: 150,
    category: "Desserts",
    image: "food_10",
  },
  { name: "Jar Ice Cream", price: 110, category: "Desserts", image: "food_11" },
  {
    name: "Vanilla Ice Cream",
    price: 100,
    category: "Desserts",
    image: "food_12",
  },

  {
    name: "Chicken Sandwich",
    price: 160,
    category: "Sandwich",
    image: "food_13",
  },
  {
    name: "Vegan Sandwich",
    price: 140,
    category: "Sandwich",
    image: "food_14",
  },
  {
    name: "Grilled Sandwich",
    price: 150,
    category: "Sandwich",
    image: "food_15",
  },
  {
    name: "Bread Sandwich",
    price: 120,
    category: "Sandwich",
    image: "food_16",
  },

  { name: "Cup Cake", price: 90, category: "Cake", image: "food_17" },
  { name: "Vegan Cake", price: 140, category: "Cake", image: "food_18" },
  { name: "Butterscotch Cake", price: 180, category: "Cake", image: "food_19" },
  { name: "Sliced Cake", price: 120, category: "Cake", image: "food_20" },

  { name: "Matar Paneer", price: 220, category: "Paneer", image: "food_21" },
  { name: "Palak Paneer", price: 240, category: "Paneer", image: "food_22" },
  { name: "Shahi Paneer", price: 260, category: "Paneer", image: "food_23" },
  { name: "Paneer Tikka", price: 280, category: "Paneer", image: "food_24" },

  { name: "Masala Dosa", price: 120, category: "Dosa", image: "food_25" },
  { name: "Mysore Dosa", price: 140, category: "Dosa", image: "food_26" },
  { name: "Onion Dosa", price: 130, category: "Dosa", image: "food_27" },
  { name: "Cheese Dosa", price: 160, category: "Dosa", image: "food_28" },

  { name: "Butter Noodles", price: 150, category: "Noodles", image: "food_29" },
  { name: "Veg Noodles", price: 160, category: "Noodles", image: "food_30" },
  { name: "Somen Noodles", price: 170, category: "Noodles", image: "food_31" },
  { name: "Cooked Noodles", price: 180, category: "Noodles", image: "food_32" },
];

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://yasha123:yasha123@cluster0.pvsc1kc.mongodb.net/foodDeli",
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

const seedFoods = async () => {
  try {
    await connectDB();

    await FoodItem.deleteMany();

    await FoodItem.insertMany(foods);

    console.log("Foods seeded successfully 🌱");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedFoods();
