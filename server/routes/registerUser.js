import client from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await client.query(
      "INSERT INTO users ( name , email , password) VALUES($1,$2,$3) RETURNING * ",
      [name, email, hashedPassword],
    );

    return res.json({
      success: true,
      data: newUser.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
