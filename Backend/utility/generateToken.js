import jwt from "jsonwebtoken";

const generateToken = (userData) => {
  return jwt.sign(
    {
      id: userData._id,
      role: userData.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;
