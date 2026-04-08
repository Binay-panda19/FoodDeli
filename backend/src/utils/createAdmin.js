import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

await mongoose.connect(
  "mongodb+srv://yasha123:yasha123@cluster0.pvsc1kc.mongodb.net/foodDeli",
);

const createAdmin = async () => {
  const admin = new User({
    name: "Admin",
    email: "admin@fooddeli.com",
    password: "admin123",
    role: "admin",
  });

  await admin.save();

  console.log("Admin created");
  process.exit();
};

createAdmin();
