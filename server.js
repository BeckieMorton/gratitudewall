import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//------Connect to database------//
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/gratitudewall";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

//-----Check connection is working----//
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

//-----Define mongoose model based on gratitudes database----//
const gratitude = mongoose.model("Gratitude", {
  message: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 140,
  },
  hearts: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
});

//-------Defines the port the app will run on-----//
const port = process.env.PORT || 8080;
const app = express();

//--------Add middlewares-------//
app.use(cors());
app.use(express.json());

//---------END POINTS---------//

//lists all end points
app.get("/", (req, res) => {
  res.send(listEndpoints(app));
});

//----- End point for all sites-----//
app.get("/gratitudes", async (req, res) => {
  const gratitudes = await gratitude.find();
  res.json(gratitudes);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
