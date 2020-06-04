"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var orderSchema = _mongoose2.default.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true }
});

exports.default = _mongoose2.default.model("Order", orderSchema, "orders");