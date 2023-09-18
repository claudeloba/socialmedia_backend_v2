import mysql from "mysql2";
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) throw err;
  if (connection) {
    connection.release();
  }
  console.log("Database connected!".bgGreen);
});

export default pool;
