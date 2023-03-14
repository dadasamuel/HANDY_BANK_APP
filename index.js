const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./src/04Database/users.db");
const userRoute = require("./src/03Routes/user.route");
const adminRoute = require("./src/03Routes/admin.route");
dotenv.config()

const app = express();
const port = process.env.PORT

connectDb();
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to HALAT powered by PROVIDUS BANK "
    });
});

app.use("/api", userRoute)
app.use("/api", adminRoute)

app.listen(port, () => {
    console.log(`🚀🚀 server up and running on port ${port}`)
});