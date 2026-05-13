import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import client, { connectdb } from "./db/index.js";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import projectRoutes from "./routes/projects.js";

dotenv.config();

const app = express();
const allowed = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowed,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(projectRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

// app.post("/new-project", authMiddleware, async (req, res) => {
//   try {
//     const { projectname, projectdesc, status, priority, startdate, enddate } =
//       req.body;

//     const { user_id } = req.user;

//     const query = `
//       INSERT INTO projects (projectname , projectdesc , status , priority , startdate , enddate ,user_id)
//       VALUES ($1, $2, $3 , $4 , $5 ,$6 , $7)
//       RETURNING *;
//     `;

//     const values = [
//       projectname,
//       projectdesc,
//       status,
//       priority,
//       startdate,
//       enddate,
//       user_id,
//     ];

//     const result = await client.query(query, values);
//     res.status(201).json({
//       success: true,
//       data: result.rows[0],
//     });
//   } catch (error) {
//     console.error("/new-project error:", error);

//     res.status(500).json({
//       success: false,
//       message: error?.message || error?.toString?.() || "server error",
//       detail: error?.detail,
//       hint: error?.hint,
//     });
//   }
// });

const PORT = process.env.PORT || 5000;

app.use(router);

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
  });
});
