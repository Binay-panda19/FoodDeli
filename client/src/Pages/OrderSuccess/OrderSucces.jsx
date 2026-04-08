import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="order-success">
      <div className="order-card">
        <div className="success-icon">✓</div>

        <h2>Order Placed Successfully</h2>

        <p>Your delicious food is being prepared.</p>

        <p className="eta">Estimated delivery: 30-40 minutes</p>

        <button onClick={() => navigate("/orders")}>View My Orders</button>

        <button className="secondary" onClick={() => navigate("/")}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
