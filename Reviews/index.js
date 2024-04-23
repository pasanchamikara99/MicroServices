const express = require("express");
const helmet = require("helmet");
const { default: mongoose } = require("mongoose");
const app = express();
const router = require("./routes/ReviewRoutes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

app.use(helmet());
app.use(cookieParser());

const port = process.env.PORT || 3004;

app.use(express.json());
app.use(router);

mongoose
  .connect(process.env.MONGODB_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
