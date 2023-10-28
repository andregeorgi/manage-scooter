const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");

const Scooters = require("./models/Scooters");
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
