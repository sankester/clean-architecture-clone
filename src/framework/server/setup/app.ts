import express from "express";
import setupMiddleware from "./middleware";
import setupRoute from "./route";
import setupLogger from "./logger";

const app = express();

setupMiddleware(app);
setupLogger(app);
setupRoute(app);

export default app;
