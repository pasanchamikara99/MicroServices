const express = require("express");
const helmet = require("helmet");
const { default: mongoose } = require("mongoose");
const app = express();
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");

const dotenv = require("dotenv");
app.use(helmet());
dotenv.config();

app.use(cookieParser());
//app.use(csrf({ cookie: true }));

const port = process.env.PORT || 3003;

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
