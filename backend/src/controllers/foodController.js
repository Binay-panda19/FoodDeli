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

export const addFood = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Name, price and category are required",
      });
    }

    const food = await FoodItem.create({
      name,
      price,
      description,
      category,
    });

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      data: food,
    });
  } catch (error) {
    console.error("ADD FOOD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await FoodItem.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    await food.deleteOne();

    res.json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error("DELETE FOOD ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
