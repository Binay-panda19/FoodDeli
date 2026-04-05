import API from "./axios";

// Get cart
export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

// Add item
export const addToCart = async (name) => {
  const res = await API.post("/cart/add", {
    name: name,
    quantity: 1,
  });
  return res.data;
};

// Remove item
export const removeFromCart = async (foodId) => {
  const res = await API.post("/cart/remove", { foodId });
  return res.data;
};
