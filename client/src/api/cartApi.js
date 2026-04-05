import API from "./axios";

// Get cart
export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

// Add item
export const addToCart = async (foodId, quantity) => {
  const res = await API.post("/cart/add", { foodId, quantity });
  return res.data;
};

// Remove item
export const removeFromCart = async (foodId) => {
  const res = await API.post("/cart/remove", { foodId });
  return res.data;
};
