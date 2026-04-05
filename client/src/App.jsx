import React, { useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./component/Footer/Footer.jsx";
import LoginPopup from "./component/LoginPopup/LoginPopup.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} setUser={setUser} />
      )}

      <div className="app">
        {/* pass setShowLogin here */}
        <Navbar setShowLogin={setShowLogin} user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* 🔒 Protected */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/placeorder"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
