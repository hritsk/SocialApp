const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// ✅ CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// ✅ API Routes
const post = require("./routes/post");
const user = require("./routes/user");

app.use("/api/v1", post);
app.use("/api/v1", user);

// ❌ Comment if frontend is deployed separately
// app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

module.exports = app;
