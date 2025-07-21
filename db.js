import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err.message);
  } else {
    console.log("✅ MySQL Connected");
  }
});
