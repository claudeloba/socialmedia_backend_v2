import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jwtKey = process.env.JWT_KEY;

const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  try {
    const userInfo = jwt.verify(token, jwtKey);
    req.user = userInfo;
    next();
  } catch (err) {
    res.status(403).json("Token is not valid!");
  }
};

export default authenticate;
