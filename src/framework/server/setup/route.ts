import { Express, Router } from "express";
import { adaptRoute } from "../adapter/adaptRouteExpress";
import {
  makeAddBookController,
  makeGetAllBookController,
  makeDeleteBookController,
} from "../factories/controller";

export default (app: Express) => {
  const router = Router();
  app.use("/error", (_req, res) => {
    res.statusCode = 215;
    res.end();
  });
  app.use("/api", router);
  router.post("/book", adaptRoute(makeAddBookController()));
  router.get("/book", adaptRoute(makeGetAllBookController()));
  router.delete("book/:bookId"), adaptRoute(makeDeleteBookController());
};
