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
  const { name, quantity } = req.body;

  try {
    // ✅ Validate input
    if (!name || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // 🔍 Find food by name (single item)
    const food = await FoodItem.findOne({ name: name });

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // 🛒 Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        totalPrice: 0,
      });
    }

    // 🔁 Check if item already exists (compare by name)
    const itemIndex = cart.items.findIndex((item) => item.name === name);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        name: food.name, // store name
        quantity,
        price: food.price,
      });
    }

    // 💰 Recalculate total
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.quantity * item.price,
      0,
    );

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.error(error);
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
