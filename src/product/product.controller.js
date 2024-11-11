//layered untuk handle request dan response
//Biasanya juga untuk handle validasi dan body
const express = require("express");
const router = express.Router();

const prisma = require("../db");
const {
  getAllProducts,
  getProductById,
  createProduct,
  editProductById,
  deleteProductById,
} = require("./product.service");

router.get("/", async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  const product = await getProductById(parseInt(productId));
  res.send(product);
});
router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;

    const product = await createProduct();

    res.status(201).send({
      data: product,
      message: "Create Product Success",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id; //ini tetap string

    await deleteProductById(parseInt(productId));
    res.send("product deleted");
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.put("/:id", async (req, res) => {
  const productId = req.params.id;
  const productData = req.body;

  if (
    !(
      productData.name &&
      productData.description &&
      productData.image &&
      productData.price
    )
  ) {
    return res.status(400).send("Some fields are missing");
  }

  const product = await editProductById(parseInt(productId), productData);

  res.send({
    data: product,
    message: "product edited sucessfully",
  });
});
router.patch("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(parseInt(productId), productData);

    res.send({
      data: product,
      message: "product edited sucessfully",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
