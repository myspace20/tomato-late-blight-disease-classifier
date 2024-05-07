import express from "express";
import { handlerWrapper } from "../util";
import { authLoginPost, refreshTokenHandler } from "../handlers/auth";
import {
  activateUser,
  createUserAccount,
  requestUserPasswordReset,
  resetUserPassword,
  updateProfile,
  userVerifyAccount,
} from "../handlers/user";
import uploads from "../infra/file-storage/uploads";

const router = express.Router();

router.post("/sign_up", handlerWrapper(createUserAccount));

router.post("/login", handlerWrapper(authLoginPost));

router.post('/refresh_token', handlerWrapper(refreshTokenHandler));


router.get("/auth/verify/:token", handlerWrapper(userVerifyAccount));

router.post("/request_reset", handlerWrapper(requestUserPasswordReset));

router.post("/reset/:token", handlerWrapper(resetUserPassword));

router.patch(
  "/complete_profile",
  uploads.upload.single("avatar"),
  handlerWrapper(activateUser),
);

router.patch(
  '/update_profile',
  uploads.upload.single('avatar'),
  handlerWrapper(updateProfile),
);

export default router;
