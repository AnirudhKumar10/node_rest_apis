"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _order = require("../models/order");

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orders = _express2.default.Router();

orders.get("/", function (req, res, next) {
  _order2.default.find({}, function (err, products) {
    if (err) res.status(400).json({ message: err });else {
      res.status(200).json(products);
    }
  });
});

orders.post("/add", function (req, res, next) {
  var order = new _order2.default(req.body);
  order.save().then(function () {
    res.status(200).json({ message: "Record was inserted successfully." });
  }).catch(function () {
    res.status(400).json({ message: "There was some error." });
  });
});

orders.get("/:id", function (req, res, next) {
  _order2.default.findById(req.params.id, function (err, product) {
    if (err) res.status(400).json({ message: "There was some error fetching the record." });else {
      res.status(200).json(product);
    }
  });
});

orders.delete("/remove/:id", function (req, res, next) {
  _order2.default.findOneAndRemove({ _id: req.params.id }, function (err, product) {
    if (err) res.status(400).json({ message: "There was some error deleting the record." });else {
      res.status(200).send("The product was deleted: " + product);
    }
  });
});

exports.default = orders;