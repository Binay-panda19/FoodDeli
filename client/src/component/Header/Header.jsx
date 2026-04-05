import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <h2>Order your favorite food here</h2>
        <p>
          Choose from a diverse menu featuring a delightful array of dishes
          crafted
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
