const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const router = require("./routes/bookRoutes");
const dotenv = require("dotenv");
const helmet = require("helmet");

app.use(helmet());

dotenv.config();

const port = process.env.BOOKS_PORT || 3001;

app.use(express.json());
app.use(router);

mongoose
  .connect(process.env.BOOKS_MONGODB_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
