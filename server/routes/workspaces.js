import express from "express";
import client from "../db/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE WORKSPACE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const user_id = req.user.user_id;

    const result = await client.query(
      `
      INSERT INTO workspaces (name, user_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [name, user_id],
    );

    res.status(201).json({
      success: true,
      workspace: result.rows[0],
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET WORKSPACES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await client.query(
      `
      SELECT *
      FROM workspaces
      WHERE user_id = $1
      ORDER BY id DESC
      `,
      [user_id],
    );

    res.json({
      success: true,
      workspaces: result.rows,
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
