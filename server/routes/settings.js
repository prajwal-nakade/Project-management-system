import express from "express";
import client from "../db/index.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

// GET PROFILE
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await client.query(
      `
      SELECT id, username, email, profilepic
      FROM users
      WHERE id = $1
      `,
      [user_id],
    );

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// UPDATE PROFILE
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const { username, email, profilepic } = req.body;

    const result = await client.query(
      `
      UPDATE users
      SET
        username = $1,
        email = $2,
        profilepic = $3
      WHERE id = $4
      RETURNING *
      `,
      [username, email, profilepic, user_id],
    );

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
export default router;