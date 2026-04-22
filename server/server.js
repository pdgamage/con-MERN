const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./User");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

console.log("MONGODB_URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://mongo:27017/dockertest")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect MongoDB", err);
  });

app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(201)
      .json({ message: "user fletched success fully", data: users });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" + error });
  }
});

app.listen(5000, () => {
  console.log("mongo db running on port 5000");
});
