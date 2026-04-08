import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2>FoodDeli Admin</h2>

        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/add-food">Add Food</Link>
        <Link to="/admin/foods">Food List</Link>
        <Link to="/admin/orders">Orders</Link>
      </div>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
