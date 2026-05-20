import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectdb } from "./db/index.js";

import router from "./routes/authRoutes.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";
import teamRoutes from "./routes/team.js";
import insightsRoutes from "./routes/projectInsights.js";
import workspaceRoutes from "./routes/workspaces.js";
import settingRoute from "./routes/settings.js"

dotenv.config();

const app = express();

const allowed = ["http://localhost:5173", "https://project-management-system-n9sh.vercel.app"];

app.use(
  cors({
    origin: allowed,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use(router);

app.use("/projects", projectRoutes);

app.use("/tasks", taskRoutes);

app.use("/api/team", teamRoutes);
app.use("/projects", insightsRoutes);

app.use("/workspaces", workspaceRoutes);
app.use("/settings" , settingRoute);
app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
  });
});
