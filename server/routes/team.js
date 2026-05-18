import express from "express";
import client from "../db/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// GET TEAM MEMBERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await client.query(
      `
      SELECT *
      FROM team_members
      WHERE user_id = $1
      ORDER BY id DESC
      `,
      [user_id]
    );

    res.status(200).json({
      success: true,
      members: result.rows,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// ADD TEAM MEMBER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const user_id = req.user.user_id;

    const result = await client.query(
      `
      INSERT INTO team_members
      (name, email, role, user_id)
      VALUES ($1,$2,$3,$4)
      RETURNING *;
      `,
      [name, email, role, user_id]
    );

    res.status(201).json({
      success: true,
      member: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


// DELETE TEAM MEMBER
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const user_id = req.user.user_id;

    await client.query(
      `
      DELETE FROM team_members
      WHERE id = $1
      AND user_id = $2
      `,
      [id, user_id]
    );

    res.status(200).json({
      success: true,
      message: "Member Removed",
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;