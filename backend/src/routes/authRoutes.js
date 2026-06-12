const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {

    res.json({
      message: "Protected route accessed",
      user: req.user
    });

  }
);