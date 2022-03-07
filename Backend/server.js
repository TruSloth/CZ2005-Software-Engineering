const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const register = require("./routes/register");
const login = require("./routes/login");

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database connected")
);

app.use(express.json());
app.use(cors());
app.use("/", register);
app.use("/", login);

app.listen(4000, () => console.log("Server is up"));

