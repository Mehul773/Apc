const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require('./config/db');
const colors = require("colors");

const studentRoute = require('./routes/studentRoute')

dotenv.config();
const PORT = process.env.PORT || 4013;

const app = express();
app.use(express.json())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.listen(PORT, () =>
  console.log(
    `Server started on`.cyan+ ` http://localhost:${PORT}`.blue
  )
);
connectDB();

app.use("/student",studentRoute)
