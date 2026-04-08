import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

function Cart() {
  const { food_list } = useContext(StoreContext);
  const { cartItems, removeFromCart } = useCart();

  const navigate = useNavigate();

  const getTotalCartAmount = () => {
    let total = 0;

    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        total += item.price * cartItems[item._id];
      }
    });

    return total;
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr />

        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div className="cart-items-title cart-items-item" key={item._id}>
                <img src={assets[item.image]} alt={item.name} />

                <p>{item.name}</p>

                <p>₹{item.price}</p>

                <p>{cartItems[item._id]}</p>

                <p>₹{item.price * cartItems[item._id]}</p>

                <p className="remove" onClick={() => removeFromCart(item._id)}>
                  X
                </p>
              </div>
            );
          }

          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹50</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() + 50}</b>
            </div>
          </div>
        </div>

        <button
          disabled={getTotalCartAmount() === 0}
          onClick={() => navigate("/placeorder")}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>

      <div className="cart-promocode">
        <div>
          <p>If you have a promo code, enter it here</p>

          <div className="cart-promocode-input">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
