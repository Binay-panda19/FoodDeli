import FoodItem from "../models/FoodItem.js";

export const getFoods = async (req, res) => {
  try {
    const foods = await FoodItem.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
