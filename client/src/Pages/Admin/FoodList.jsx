import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";
import "./FoodList.css";

function FoodList() {
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (err) {
      toast.error("Failed to fetch foods");
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const deleteFood = async (id) => {
    try {
      await API.delete(`/foods/${id}`);
      toast.success("Food deleted");
      fetchFoods();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="foodlist-container">
      <h2>Food List</h2>

      <table className="food-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food) => (
            <tr key={food._id}>
              <td>{food.name}</td>
              <td>₹{food.price}</td>
              <td>{food.category}</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteFood(food._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FoodList;
