const express = require("express");
const { authorize, authenticate } = require("../../Middlewares/hot.middleware");
const { signUp, login, getAccountNumber } = require("../controller/user.controller");

const router = express.Router();
router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/account-number", authenticate, getAccountNumber);


module.exports = router