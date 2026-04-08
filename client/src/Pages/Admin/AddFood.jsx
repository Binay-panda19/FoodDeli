import { useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";
import "./AddFood.css";

function AddFood() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/foods/add", form);
      toast.success("Food added successfully");

      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
      });
    } catch (error) {
      toast.error("Failed to add food");
    }
  };

  return (
    <div className="add-food-container">
      <h2>Add Food Item</h2>

      <form className="add-food-form" onSubmit={handleSubmit}>
        <input
          placeholder="Food name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button className="add-food-btn" type="submit">
          Add Food
        </button>
      </form>
    </div>
  );
}

export default AddFood;
