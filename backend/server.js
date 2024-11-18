require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const flowRoutes = require("./routes/flowRoutes");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/flows", flowRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
