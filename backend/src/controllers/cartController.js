import Cart from "../models/Cart.js";
import FoodItem from "../models/FoodItem.js";

// ✅ Get user cart
export const getCart = async (req, res) => {
  try {
    console.log("USER FROM PROTECT:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.food",
    );

    if (!cart) {
      return res.json({
        items: [],
        totalPrice: 0,
      });
    }

    res.json(cart);
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  console.log(req.body);
  const { foodId, quantity } = req.body;

  console.log("USER:", req.user);
  console.log("BODY:", req.body);

  try {
    if (!foodId || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // 🔍 Find food by id
    // const food = await FoodItem.findById(foodId);
    const food = await FoodItem.findOne({ name: req.body.name });

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // 🛒 Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    // 🔁 Check if item already exists
    const itemIndex = cart.items.findIndex(
      (item) => item.food.toString() === foodId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        food: food._id,
        quantity,
        price: food.price,
      });
    }

    // 💰 Recalculate total
    cart.calcTotalPrice();

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
