import client from "../db/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await client.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json("User not Found");
    }

    console.log(user.rows[0].password);
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json("Invalid Credentials");
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET);

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      message: "Login Successful",
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
