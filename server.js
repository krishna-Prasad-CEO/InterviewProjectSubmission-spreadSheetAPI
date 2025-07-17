import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

require("dotenv").config();

const apiRoutes = require("./routes/api");

app.use(express.json());

app.use("/api", apiRoutes);

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
