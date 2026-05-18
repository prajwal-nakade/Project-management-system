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

// DELETE PROJECT
router.delete("/projects/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const user_id = req.user.user_id;

    const result = await client.query(
      `
      DELETE FROM projects
      WHERE id = $1 AND user_id = $2
      RETURNING *;
      `,
      [id, user_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// UPDATE PROJECT STATUS
router.put("/projects/:id/status", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const user_id = req.user.user_id;

    const result = await client.query(
      `
        UPDATE projects
        SET status = $1
        WHERE id = $2
        AND user_id = $3
        RETURNING *;
        `,
      [status, id, user_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
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

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await client.query(
      `
      SELECT *
      FROM projects
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
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
