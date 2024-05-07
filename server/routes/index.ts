import { Router } from "express";

import authRouter from "./authRouter";
import userRouter from "./userRouter";
import metricRouter from "./metrics";
import scanRouter from "./scanRouter";

const routes: Router[] = [authRouter, userRouter, scanRouter, metricRouter];

export default routes;
