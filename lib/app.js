"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _products = require("./routes/products");

var _products2 = _interopRequireDefault(_products);

var _orders = require("./routes/orders");

var _orders2 = _interopRequireDefault(_orders);

var _users = require("./routes/users");

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3000;

var app = (0, _express2.default)();

var remoteUrl = "mongodb+srv://admin:admin123@mycluster-oalb1.mongodb.net/test?retryWrites=true&w=majority";
var localUrl = "mongodb://localhost/shopdb";
_mongoose2.default.connect(localUrl, { useNewUrlParser: true });
_mongoose2.default.connection.once("open", function () {
  console.log("MongoDb connected to database succesfully.");
});
_mongoose2.default.connection.on("err", function () {
  console.log(err);
});

app.use(_bodyParser2.default.json());

app.get("/", function (req, res, next) {
  res.status(200).json({
    message: "Home API works."
  });
});

app.use("/products", _products2.default);
app.use("/orders", _orders2.default);
app.use("/users", _users2.default);

app.listen(port, function () {
  console.log("Server Started at port number: " + port);
});