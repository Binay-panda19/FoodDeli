import { createContext, useState, useEffect } from "react";
import API from "../api/axios";
import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
  getCart,
} from "../api/cartApi";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoodList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔄 Fetch cart from backend
  const fetchCart = async () => {
    try {
      const data = await getCart();

      // convert array → object {id: quantity}
      const cartObj = {};
      data.items.forEach((item) => {
        cartObj[item.food._id] = item.quantity;
      });

      setCartItems(cartObj);
    } catch (err) {
      console.log("Cart fetch error:", err);
    }
  };

  // 🚀 Load cart on start
  useEffect(() => {
    fetchFoods();
    fetchCart();
  }, []);

  // ➕ Add to cart (backend + state)
  const addToCart = async (foodId) => {
    try {
      await apiAddToCart(foodId, 1);

      setCartItems((prev) => ({
        ...prev,
        [foodId]: prev[foodId] ? prev[foodId] + 1 : 1,
      }));
    } catch (err) {
      console.log("Add error:", err.message);
    }
  };

  // ➖ Remove from cart
  const removeFromCart = async (itemId) => {
    try {
      await apiRemoveFromCart(itemId);

      setCartItems((prev) => {
        const updated = { ...prev };

        if (updated[itemId] > 1) {
          updated[itemId] -= 1;
        } else {
          delete updated[itemId];
        }

        return updated;
      });
    } catch (err) {
      console.log("Remove error:", err);
    }
  };

  // 💰 Calculate total
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = food_list.find((product) => product._id === itemId);

      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }

    return totalAmount;
  };

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
