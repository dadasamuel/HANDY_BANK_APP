const express = require("express");
const dotenv = require("dotenv");
const { connectDb } = require("./src/database/users.db");
const userRoute = require("./src/routes/user.route");
const adminRoute = require("./src/routes/admin.route");
dotenv.config()

const app = express();
const port = process.env.PORT

connectDb();
app.use(express.json());
app.get("/", (req, res) => {
        res.send("Welcome to HANDY BANK APP powered by PROVIDUS BANK")
});

app.use("/api", userRoute)
app.use("/api", adminRoute)

app.listen(port, () => {
    console.log(`🚀🚀 server up and running on port: ${port}`)
});