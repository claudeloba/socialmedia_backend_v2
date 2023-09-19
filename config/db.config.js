import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_URI } = process.env;
const connection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (err) {
    throw new Error("Error connecting to MongoDB");
  }
};
export default connection;
