import express from "express";
import client from "../db/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE PROJECT
router.post("/new-project", authMiddleware, async (req, res) => {
  try {
    const { projectname, projectdesc, status, priority, startdate, enddate } =
      req.body;

    const user_id = req.user.user_id;

    const query = `
      INSERT INTO projects
      (
        projectname,
        projectdesc,
        status,
        priority,
        startdate,
        enddate,
        user_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
    `;

    const values = [
      projectname,
      projectdesc,
      status,
      priority,
      startdate,
      enddate,
      user_id,
    ];

    const result = await client.query(query, values);

    res.status(201).json({
      success: true,
      project: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET USER PROJECTS
router.get("/projects", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await client.query(
      `
      SELECT * FROM projects
      WHERE user_id = $1
      ORDER BY id DESC
      `,
      [user_id],
    );

    res.status(200).json({
      success: true,
      projects: result.rows,
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
