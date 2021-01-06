import express from "express";
import setupMiddleware from "./middleware";
import setupRoute from "./route";
import setupLogger from "./logger";

const app = express();

setupLogger(app);
setupMiddleware(app);
setupRoute(app);

export default app;
