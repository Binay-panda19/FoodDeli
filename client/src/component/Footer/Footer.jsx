import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        {/* LEFT SECTION */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
            velit eligendi incidunt corrupti aliquid deserunt accusantium totam.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.twitter_icon} alt="twitter" />
            <img src={assets.linkedin_icon} alt="linkedin" />
          </div>
        </div>

        {/* CENTER SECTION */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-9359843313</li>
            <li>cyasha05@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-copyright">
        Copyright 2025 © Tomato.com - All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
