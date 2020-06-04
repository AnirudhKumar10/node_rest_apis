import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email }, (err, user) => {
    if (user.length == 1) {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          res.status(404).json({ message: "Auth failed." });
        } else {
          let token = jwt.sign(
            { email: user[0].email, userId: user[0]._id },
            "secret"
          );
          res.status(200).json({
            message: "Auth Successful",
            userId: user[0]._id,
            userEmail: user[0].email,
            token: token,
          });
        }
      });
    } else {
      res.send("Email not found")
    }
  });
});

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length >= 1) {
      res.status(409).json({ message: "Email already exits" });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(404).json({ message: "There was some creating user." });
        } else {
          user = new User({
            email: req.body.email,
            password: hash,
          });
          user
            .save()
            .then(() => {
              res
                .status(201)
                .json({ message: "User was successfully created" });
            })
            .catch(() => {
              res
                .status(404)
                .json({ message: "There was some creating user." });
            });
        }
      });
    }
  });
});

router.delete("/:userId", (req, res, next) => {
  User.findByIdAndRemove({ _id: req.params.userId }, (err, user) => {
    if (err) {
      res.status(404).json({ message: "There was some deleting user" });
    } else {
      res
        .status(200)
        .json({ message: "User was deleted Successfully.", user: user });
    }
  });
});

export default router;
