import Cart from "../models/Cart.js";
import FoodItem from "../models/FoodItem.js";

// 🛒 Get User Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.food",
    );

    if (!cart) {
      return res.json({
        success: true,
        items: [],
        totalPrice: 0,
      });
    }

    res.json({
      success: true,
      items: cart.items,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ➕ Add Item To Cart
export const addToCart = async (req, res) => {
  try {
    const { foodId, quantity = 1 } = req.body;

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Food ID required",
      });
    }

    // 🔍 find food by ID
    const food = await FoodItem.findById(foodId);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food not found",
      });
    }

    // 🛒 find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    // 🔁 check if food already exists
    const existingItem = cart.items.find(
      (item) => item.food.toString() === foodId,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        food: food._id,
        quantity,
        price: food.price,
      });
    }

    // 💰 recalc total
    cart.calcTotalPrice();

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.food",
    );

    res.json({
      success: true,
      message: "Item added to cart",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("ADD CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ❌ Remove Item
export const removeFromCart = async (req, res) => {
  try {
    const { foodId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter((item) => item.food.toString() !== foodId);

    cart.calcTotalPrice();

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.food",
    );

    res.json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    console.error("REMOVE CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
