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

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://charuprabha228:6LoUGtIosjdr1Z1r@cluster0.lpkicec.mongodb.net/socialmedia_builder?retryWrites=true&w=majority&appName=Cluster0", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//     process.exit(1);
//   }
// };

// connectDB();
const connectDB = async (req, res) => {
  try {
      await mongoose.connect(process.env.MONGO_URL).then(() => {
          console.log("Connected")
      })
  } catch (error) {
      res.status(400).json({ message: "Not Connected" });
  }
}

connectDB()

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});
