import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import API from "../../api/axios";

function LoginPopup({ setShowLogin, setUser }) {
  const [currState, setCurrState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (currState === "Login") {
        const res = await API.post("/auth/login", {
          email: data.email,
          password: data.password,
        });
        setUser(res.data);
      } else {
        const res = await API.post("/auth/register", {
          name: data.name,
          email: data.email,
          password: data.password,
          address: data.address,
          phone: data.phone,
        });
        setUser(res.data);
      }

      setShowLogin(false);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={handleSubmit} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {/* SIGNUP ONLY */}
          {currState !== "Login" && (
            <>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />

              <input
                type="text"
                name="address"
                value={data.address}
                onChange={handleChange}
                placeholder="Your address"
              />

              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </>
          )}

          {/* COMMON */}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />

          <input
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Your password"
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <p>
          {currState === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span
            onClick={() =>
              setCurrState(currState === "Login" ? "Sign Up" : "Login")
            }
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            {currState === "Login" ? " Sign Up" : " Login"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPopup;
