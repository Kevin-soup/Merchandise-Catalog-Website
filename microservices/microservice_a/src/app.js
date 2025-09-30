import express from "express";
const app = express();
import cors from "cors";
import middleware from "./utils/middleware.js";
import announcementRouter from "./controllers/announcementController.js";

// Initialize Express
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

//Mount Controllers
app.use("/announcement", announcementRouter);

//Mount error handlers
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
