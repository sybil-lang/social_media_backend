const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected");
  } catch (error) {
    console.error("Connection error", error);
  }
};

connectDB();

// middleware
// Middleware to parse incoming JSON requests
app.use(express.json()); 

// Middleware to enhance API security by setting various HTTP headers
app.use(helmet()); 

// Middleware for logging HTTP requests and responses
app.use(morgan("common")); 


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
