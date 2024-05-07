import express from "express";
import {
  createScan,
  deleteScan,
  deleteUserScan,
  getScan,
  getScans,
  getUserScans,
} from "../handlers/scan";
import { handlerWrapper } from "../util";
import uploads from "../infra/file-storage/uploads";
import authorization from "../middlewares/authorization";
import { admin } from "../middlewares/roles";

const router = express.Router();

router.post(
  "/scans",
  authorization,
  uploads.upload.single("image"),
  handlerWrapper(createScan),
);

router.get("/scans/:id",authorization, handlerWrapper(getScan));

router.get("/users/scans/",authorization, handlerWrapper(getUserScans));

router.get("/scans",authorization, admin, handlerWrapper(getScans));

router.delete("/users/scans/:id",authorization, handlerWrapper(deleteUserScan));

router.delete("/scans/:id",authorization, handlerWrapper(deleteScan));

export default router;
