import express from "express";
import client from "../db/index.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE TASK
router.post("/new-task", authMiddleware, async (req, res) => {
  try {
    const { taskname, taskdesc, status, priority, duedate, project_id } =
      req.body;

    const user_id = req.user.user_id;

    const query = `
      INSERT INTO tasks
      (
        taskname,
        taskdesc,
        status,
        priority,
        duedate,
        project_id,
        user_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *;
    `;

    const values = [
      taskname,
      taskdesc,
      status,
      priority,
      duedate,
      project_id,
      user_id,
    ];

    const result = await client.query(query, values);

    res.status(201).json({
      success: true,
      task: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET TASKS OF PARTICULAR PROJECT
router.get("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { projectId } = req.params;

    const user_id = req.user.user_id;

    const result = await client.query(
      `
      SELECT
        tasks.*,
        projects.projectname
      FROM tasks
      JOIN projects
      ON tasks.project_id = projects.id
      WHERE tasks.project_id = $1
      AND tasks.user_id = $2
      ORDER BY tasks.id DESC
      `,
      [projectId, user_id],
    );

    res.status(200).json({
      success: true,
      tasks: result.rows,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    const user_id = req.user.user_id;

    const result = await client.query(
      `
      UPDATE tasks
      SET status = $1
      WHERE id = $2
      AND user_id = $3
      RETURNING *
      `,
      [status, id, user_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
// Mytask Sidebar (moved)
// NOTE: The previous implementation used GET "/tasks" a second time, which caused route conflicts.
// If you need a separate sidebar feed, create a new endpoint (e.g. GET "/tasks/sidebar").

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const user_id = req.user.user_id;

    const result = await client.query(
      `
      SELECT
        tasks.*,
        projects.projectname
      FROM tasks
      JOIN projects
      ON tasks.project_id = projects.id
      WHERE tasks.id = $1
      AND tasks.user_id = $2
      `,
      [id, user_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      task: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user_id = req.user.user_id;

    const result = await client.query(
      `
      SELECT
        tasks.*,
        projects.projectname
      FROM tasks
      JOIN projects
      ON tasks.project_id = projects.id
      WHERE tasks.user_id = $1
      ORDER BY tasks.id DESC
      `,
      [user_id],
    );

    res.status(200).json({
      success: true,
      tasks: result.rows,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// DELETE TASK
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const user_id = req.user.user_id;

    const checkTask = await client.query(
      `SELECT * FROM tasks WHERE id = $1 AND user_id = $2`,
      [id, user_id],
    );

    if (checkTask.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await client.query(
      `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2
      `,
      [id, user_id],
    );

    res.status(200).json({
      success: true,
      message: "Task Deleted",
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
