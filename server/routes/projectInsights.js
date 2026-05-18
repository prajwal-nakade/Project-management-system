import express from "express";
import client from "../db/index.js";

const router = express.Router();

router.get("/:projectId/calendar", async (req, res) => {
  try {
    const { projectId } = req.params;

    const projectQuery = `
      SELECT *
      FROM projects
      WHERE id = $1
    `;

    const taskQuery = `
      SELECT *
      FROM tasks
      WHERE project_id = $1
    `;

    const projectResult = await client.query(projectQuery, [projectId]);
    const taskResult = await client.query(taskQuery, [projectId]);

    res.json({
      project: projectResult.rows[0],
      tasks: taskResult.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:projectId/analytics", async (req, res) => {
  try {
    const { projectId } = req.params;

    const totalTasksQuery = `
      SELECT COUNT(*) FROM tasks
      WHERE project_id = $1
    `;

    const completedTasksQuery = `
      SELECT COUNT(*) FROM tasks
      WHERE project_id = $1
      AND status = 'done'
    `;

    const inProgressTasksQuery = `
      SELECT COUNT(*) FROM tasks
      WHERE project_id = $1
      AND status = 'inprogress'
    `;

    const todoTasksQuery = `
      SELECT COUNT(*) FROM tasks
      WHERE project_id = $1
      AND status = 'todo'
    `;

    const overdueTasksQuery = `
      SELECT COUNT(*) FROM tasks
      WHERE project_id = $1
      AND duedate < CURRENT_DATE
      AND status != 'done'
    `;

    const priorityQuery = `
      SELECT priority, COUNT(*)
      FROM tasks
      WHERE project_id = $1
      GROUP BY priority
    `;

    const statusQuery = `
      SELECT status, COUNT(*)
      FROM tasks
      WHERE project_id = $1
      GROUP BY status
    `;

    const [
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      overdueTasks,
      priorityData,
      statusData,
    ] = await Promise.all([
      client.query(totalTasksQuery, [projectId]),
      client.query(completedTasksQuery, [projectId]),
      client.query(inProgressTasksQuery, [projectId]),
      client.query(todoTasksQuery, [projectId]),
      client.query(overdueTasksQuery, [projectId]),
      client.query(priorityQuery, [projectId]),
      client.query(statusQuery, [projectId]),
    ]);

    const total = Number(totalTasks.rows[0].count);
    const completed = Number(completedTasks.rows[0].count);

    const completionRate =
      total === 0 ? 0 : ((completed / total) * 100).toFixed(1);

    res.json({
      totalTasks: total,
      completedTasks: completed,
      inProgressTasks: Number(inProgressTasks.rows[0].count),
      todoTasks: Number(todoTasks.rows[0].count),
      overdueTasks: Number(overdueTasks.rows[0].count),
      completionRate,
      priorityData: priorityData.rows,
      statusData: statusData.rows,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;