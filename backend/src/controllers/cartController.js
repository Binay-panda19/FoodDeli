import Cart from "../models/Cart.js";
import FoodItem from "../models/FoodItem.js";

// ✅ Get user cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.food",
    );

    if (!cart) {
      return res.json({ items: [], totalPrice: 0 });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  const { foodId, quantity } = req.body;

  try {
    // 🔥 Validate foodId
    const food = await FoodItem.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        totalPrice: 0,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.food.toString() === foodId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        food: foodId,
        quantity,
        price: food.price, // ✅ FIX HERE
      });
    }

    // 🔥 Recalculate total
    cart.calcTotalPrice();

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.log(error); // 🔍 debug
    res.status(500).json({ message: error.message });
  }
};

// ✅ Remove item
export const removeFromCart = async (req, res) => {
  const { foodId } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.food.toString() !== foodId);

    // 🔥 recalculate total
    cart.calcTotalPrice();

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
