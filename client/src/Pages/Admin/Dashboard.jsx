function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div
          style={{ background: "white", padding: "20px", borderRadius: "10px" }}
        >
          <h3>Total Orders</h3>
          <p>120</p>
        </div>

        <div
          style={{ background: "white", padding: "20px", borderRadius: "10px" }}
        >
          <h3>Total Foods</h3>
          <p>45</p>
        </div>

        <div
          style={{ background: "white", padding: "20px", borderRadius: "10px" }}
        >
          <h3>Revenue</h3>
          <p>₹25,000</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
