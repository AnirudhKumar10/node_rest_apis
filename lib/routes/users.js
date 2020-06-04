"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/login", function (req, res, next) {
  _user2.default.find({ email: req.body.email }, function (err, user) {
    if (user.length == 1) {
      _bcrypt2.default.compare(req.body.password, user[0].password, function (err, result) {
        if (err) {
          res.status(404).json({ message: "Auth failed." });
        } else {
          var token = _jsonwebtoken2.default.sign({ email: user[0].email, userId: user[0]._id }, "secret");
          res.status(200).json({
            message: "Auth Successful",
            userId: user[0]._id,
            userEmail: user[0].email,
            token: token
          });
        }
      });
    } else {
      res.send("Email not found");
    }
  });
});

router.post("/signup", function (req, res, next) {
  _user2.default.find({ email: req.body.email }).then(function (user) {
    if (user.length >= 1) {
      res.status(409).json({ message: "Email already exits" });
    } else {
      _bcrypt2.default.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          res.status(404).json({ message: "There was some creating user." });
        } else {
          user = new _user2.default({
            email: req.body.email,
            password: hash
          });
          user.save().then(function () {
            res.status(201).json({ message: "User was successfully created" });
          }).catch(function () {
            res.status(404).json({ message: "There was some creating user." });
          });
        }
      });
    }
  });
});

router.delete("/:userId", function (req, res, next) {
  _user2.default.findByIdAndRemove({ _id: req.params.userId }, function (err, user) {
    if (err) {
      res.status(404).json({ message: "There was some deleting user" });
    } else {
      res.status(200).json({ message: "User was deleted Successfully.", user: user });
    }
  });
});

exports.default = router;