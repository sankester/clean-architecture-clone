import "module-alias/register";
import app from "./setup/app";
import { logger } from "@adapter/utils/winston";
import MongoConnection from "../db/mongodb/connection/index";

const start = async () => {
  try {
    await MongoConnection.open();
    app.listen(3000, () => {
      logger.info("server running in http://localhost:3000");
    });
  } catch (error) {
    logger.error(`start server : ${error}`);
  }
};

start();