"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/login", function (req, res, next) {
  res.send("LOGIN");
});

router.post("/signup", function (req, res, next) {
  res.send("SIGNUP");
});

router.delete("/:userId", function (req, res, next) {
  res.send("DELETE " + userId);
});

exports.default = router;