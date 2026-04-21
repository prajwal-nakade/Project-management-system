import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectdb } from "./db/index.js";
import router from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const allowed = ["http://localhost:5173"]

app.use(cors({
  origin:allowed, credentials:true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 5000;

app.use(router);

connectdb().then(()=>{
  app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
})
