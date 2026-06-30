const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", authController.register);  //1
router.post("/login", authController.login);  //1

router.get("/me", authMiddleware, authController.getCurrentUser);

router.post("/refresh-token", authController.refreshToken);  //1

router.post("/logout", authMiddleware, authController.logout);

router.post("/forgot-password", authController.forgotPassword);  //0
router.post("/reset-password", authController.resetPassword); //1

module.exports = router;