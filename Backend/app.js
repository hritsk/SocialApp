const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

const cors = require("cors");
app.use(cors({
   origin: ["http://localhost:3000", "https://social-app-g7t6.vercel.app"],
   credentials: true,
}));
app.options("*", cors());

const post = require("./routes/post");
const user = require("./routes/user");

app.use("/api/v1", post);
app.use("/api/v1", user);


module.exports = app;
