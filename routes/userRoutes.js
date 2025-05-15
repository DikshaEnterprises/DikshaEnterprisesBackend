const express = require("express");
const router = express.Router();
const { createUser, getUser } = require("../controllers/userController");

router.post("/", createUser);
router.get("/get-user", getUser);  // expects userId in body

module.exports = router;
