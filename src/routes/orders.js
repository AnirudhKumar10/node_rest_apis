import express from "express";
import Order from "../models/order";

const orders = express.Router();

orders.get("/", checkAuth, (req, res, next) => {
  Order.find({}, (err, products) => {
    if (err) res.status(400).json({ message: err });
    else {
      res.status(200).json(products);
    }
  });
});

orders.post("/add", checkAuth, (req, res, next) => {
  let order = new Order(req.body);
  order
    .save()
    .then(() => {
      res.status(200).json({ message: "Record was inserted successfully." });
    })
    .catch(() => {
      res.status(400).json({ message: "There was some error." });
    });
});

orders.get("/:id", checkAuth, (req, res, next) => {
  Order.findById(req.params.id, (err, product) => {
    if (err)
      res
        .status(400)
        .json({ message: "There was some error fetching the record." });
    else {
      res.status(200).json(product);
    }
  });
});

orders.delete("/remove/:id", checkAuth, (req, res, next) => {
  Order.findOneAndRemove({ _id: req.params.id }, (err, product) => {
    if (err)
      res
        .status(400)
        .json({ message: "There was some error deleting the record." });
    else {
      res.status(200).send(`The product was deleted: ${product}`);
    }
  });
});

export default orders;
