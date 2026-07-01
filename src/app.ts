import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import ratingRoutes from "./routes/rating.route";
import categoryRoutes from "./routes/category.route";
import phoneRoutes from "./routes/phone.route";
import savedRoutes from "./routes/saved.route";

dotenv.config();

const app: Application = express();

let corsOption = {
  origin: ["http://localhost:3000", "http://localhost:3003"],
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uploadsPath = path.resolve(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsPath));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/phone", phoneRoutes);
app.use("/api/saved", savedRoutes);

app.get("/", (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: "true", message: "welcome to the api" });
});

export default app;
