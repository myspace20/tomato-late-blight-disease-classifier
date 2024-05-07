import app from "./app";
import { Application } from "express";
import { logger } from "./util/logger";
import dbInstance from "./infra/database/connect";




const startServer = async (app: Application) => {
  app.listen(5001, () => {
    dbInstance;
    logger.info("server is up on 5000");
  });
};

startServer(app);
