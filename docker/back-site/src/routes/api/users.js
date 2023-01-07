const express = require("express");
const authorize = require("../../middlewares/authorize");
const {
  catchRegErrors,
  catchLogErrors,
  catchErrors,
} = require("../../middlewares/catch-errors");
const {
  postSignupValidation,
  postLoginValidation,
} = require("../../middlewares/validationSchema");
const router = express.Router();
const {
  signinUserController,
  logoutUserController,
  signupUserController,
  getCurrentUserController,
  refreshTokenController,
  getUsers,
  deleteUser,
  getUserInfo,
} = require("../../controllers/users");


router.post(
  "/signup",
  postSignupValidation,
  catchRegErrors(signupUserController)
);

router.post(
  "/login",
  postLoginValidation,
  catchLogErrors(signinUserController)
);

router.get("/logout", authorize, catchErrors(logoutUserController));

router.get("/current", authorize, catchErrors(getCurrentUserController));

router.get("/refresh", authorize, catchErrors(refreshTokenController));

router.get("/", catchErrors(getUsers));

router.get("/info", catchErrors(getUserInfo));

router.delete("/:userId", catchErrors(deleteUser));

module.exports = router;
