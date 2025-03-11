const express = require("express");
const { createUser, getAllUsers } = require("../controllers/user");
const router = express.Router();


router.post("/create", createUser);
router.get("/", getAllUsers);

module.exports = router