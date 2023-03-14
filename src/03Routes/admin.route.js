const express = require("express");
const { authorize, authenticate } = require("../../Middlewares/hot.middleware");
const { getAllUsers, blockAUser, totalCountUsers } = require("../02Controller/admin.controller");

const router = express.Router();
router.get("/all-users", authenticate, authorize, getAllUsers);
router.patch("/block-user", authenticate, authorize, blockAUser);
router.get("/total-users", authenticate, authorize, totalCountUsers);

module.exports = router;