const express = require("express");
const router = express.Router();
const UserService = require("./users.service");

const prisma = require("../db");

//register a new user
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await UserService.registerUser({ email, password, role });
    res.status(201).json({ Message: "User Created", user });
  } catch (e) {
    res.status(400).json({ e: message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await UserService.loginUser({ email, password });
    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
