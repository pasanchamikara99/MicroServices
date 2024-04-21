const express = require("express");
const app = express();
const dotenv = require("dotenv");
const proxy = require("express-http-proxy");

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());
//app.use(cors());

app.use("/user", proxy("http://user:3003"));
app.use("/book", proxy("http://books:3001"));
app.use("/order", proxy("http://orders:3002"));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);