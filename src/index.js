const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("Hello World");
});

const productController = require("./product/product.controller");
app.use("/products", productController);

app.listen(PORT, () => {
  console.log("Express API Runinng in port: " + PORT);
});
