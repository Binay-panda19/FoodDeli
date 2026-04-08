import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

import StoreContextProvider from "./context/StoreContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <StoreContextProvider>
          <ToastContainer position="top-right" autoClose={3000} />
          <App />
        </StoreContextProvider>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>,
);
