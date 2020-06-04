"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _product = require("../models/product");

var _product2 = _interopRequireDefault(_product);

var _checkAuth = require("../middleware/check-auth");

var _checkAuth2 = _interopRequireDefault(_checkAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var products = _express2.default.Router();

products.get("/", function (req, res, next) {
  _product2.default.find({}, function (err, products) {
    if (err) res.status(400).json({ message: err });else {
      res.status(200).json(products);
    }
  });
});

products.post("/add", _checkAuth2.default, function (req, res, next) {
  var product = new _product2.default(req.body);
  product.save().then(function () {
    res.status(200).json({ message: "Record was inserted successfully." });
  }).catch(function () {
    res.status(400).json({ message: "There was some error." });
  });
});

products.get("/:id", function (req, res, next) {
  _product2.default.findById(req.params.id, function (err, product) {
    if (err) res.status(400).json({ message: "There was some error fetching the record." });else {
      res.status(200).json(product);
    }
  });
});

products.delete("/remove/:id", function (req, res, next) {
  _product2.default.findOneAndRemove({ _id: req.params.id }, function (err, product) {
    if (err) res.status(400).json({ message: "There was some error deleting the record." });else {
      res.status(200).send("The product was deleted: " + product);
    }
  });
});

products.put("/update/:id", function (req, res, next) {
  _product2.default.findOneAndUpdate(req.params.id, req.body, function (err, product) {
    if (err) res.status(400).json({ message: "There was some error updating the record." });else {
      res.status(200).send("The product was updated: " + product);
    }
  });
});

exports.default = products;