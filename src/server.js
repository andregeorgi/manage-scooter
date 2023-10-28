const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(express.json());

const Scooters = require("./models/Scooters");
const Users = require("./models/Users");

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://admin:albastrugri@todos.nfgv3pq.mongodb.net/scootersDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get("/api/scooter", async (req, res) => {
  try {
    const scooters = await Scooters.find({});
    res.json(scooters);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    res.json({
      message: "Login successful",
      user: { username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
