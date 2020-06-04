import express from "express";
import Product from "../models/product";
import checkAuth from "../middleware/check-auth";

const products = express.Router();

products.get("/", (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) res.status(400).json({ message: err });
    else {
      res.status(200).json(products);
    }
  });
});

products.post("/add", checkAuth, (req, res, next) => {
  let product = new Product(req.body);
  product
    .save()
    .then(() => {
      res.status(200).json({ message: "Record was inserted successfully." });
    })
    .catch(() => {
      res.status(400).json({ message: "There was some error." });
    });
});

products.get("/:id", (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err)
      res
        .status(400)
        .json({ message: "There was some error fetching the record." });
    else {
      res.status(200).json(product);
    }
  });
});

products.delete("/remove/:id", checkAuth, (req, res, next) => {
  Product.findOneAndRemove({ _id: req.params.id }, (err, product) => {
    if (err)
      res
        .status(400)
        .json({ message: "There was some error deleting the record." });
    else {
      res.status(200).send(`The product was deleted: ${product}`);
    }
  });
});

products.put("/update/:id", checkAuth, (req, res, next) => {
  Product.findOneAndUpdate(req.params.id, req.body, (err, product) => {
    if (err)
      res
        .status(400)
        .json({ message: "There was some error updating the record." });
    else {
      res.status(200).send(`The product was updated: ${product}`);
    }
  });
});

export default products;
