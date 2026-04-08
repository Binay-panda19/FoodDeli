import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // must be false in localhost
    sameSite: "none", // critical for localhost:5173 → localhost:5000
    path: "/", // important
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
