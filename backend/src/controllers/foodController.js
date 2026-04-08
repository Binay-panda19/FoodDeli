import FoodItem from "../models/FoodItem.js";
import Order from "../models/Order.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFood = () => {};
export const deleteFood = () => {};
