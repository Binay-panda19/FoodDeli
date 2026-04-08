import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!user) return;

    try {
      const res = await API.get("/cart");

      const cartObject = {};
      res.data.items.forEach((item) => {
        cartObject[item.food._id] = item.quantity;
      });

      setCartItems(cartObject);
    } catch (error) {
      console.log("Cart fetch error", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Add item
  const addToCart = async (foodId) => {
    try {
      setCartItems((prev) => ({
        ...prev,
        [foodId]: (prev[foodId] || 0) + 1,
      }));

      await API.post("/cart/add", {
        foodId,
        quantity: 1,
      });

      toast.success("Item added to cart");
    } catch (error) {
      toast.error("Failed to add item");
      fetchCart();
    }
  };

  // Remove item
  const removeFromCart = async (foodId) => {
    try {
      const updatedQty = (cartItems[foodId] || 1) - 1;

      const newCart = { ...cartItems };

      if (updatedQty <= 0) {
        delete newCart[foodId];
      } else {
        newCart[foodId] = updatedQty;
      }

      setCartItems(newCart);

      await API.post("/cart/remove", { foodId });
    } catch (error) {
      toast.error("Failed to remove item");
      fetchCart();
    }
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  };

  const handlePayment = async () => {
    const order = await API.post("/orders/create", {
      items,
      totalAmount,
      deliveryAddress,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.data.razorpayOrder.amount,
      currency: "INR",
      name: "FoodDeli",
      order_id: order.data.razorpayOrder.id,

      handler: async function (response) {
        await API.post("/orders/verify", {
          ...response,
          items,
          totalAmount,
          deliveryAddress,
        });

        toast.success("Payment successful!");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotalItems,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
