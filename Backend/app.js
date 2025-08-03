const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");


if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


const allowedOrigins = [
  "http://localhost:3000",
  "https://vercel.com/new/hritsks-projects/success?developer-id=&external-id=&redirect-url=&branch=main&deploymentUrl=social-9akc6jjk0-hritsks-projects.vercel.app&projectName=social-app&s=https%3A%2F%2Fgithub.com%2Fhritsk%2FSocialApp&gitOrgLimit=&hasTrialAvailable=1&totalProjects=1&flow-id=_NKb0pL49Da8bfjooSoJs"
];
const cors = require("cors");
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


const post = require("./routes/post");
const user = require("./routes/user");

app.use("/api/v1", post);
app.use("/api/v1", user);



module.exports = app;
