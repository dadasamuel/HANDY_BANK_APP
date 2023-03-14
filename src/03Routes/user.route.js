const express = require("express");
const { authorize, authenticate } = require("../../Middlewares/hot.middleware");
const { signUp, login, getAccountNumber } = require("../02Controller/user.controller");

const router = express.Router();
router.post("/sign-up", signUp);
router.post("/login", login);
router.get("/Account-Number/:phoneNumber",authenticate, getAccountNumber);


module.exports = router