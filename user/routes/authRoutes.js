const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { auth, authorizeAdmin } = require("../middleware/auth");



router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/welcome", auth, authController.getUserProfile);
router.get("/users", auth, authorizeAdmin, authController.getUsers);
router.put("/change-role", auth, authorizeAdmin, authController.changeRole);


module.exports = router;

