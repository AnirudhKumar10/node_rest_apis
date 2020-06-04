import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import userRoutes from "./routes/users";

const port = process.env.PORT || 3000;

const app = express();

const remoteUrl =
  "mongodb+srv://admin:admin123@mycluster-oalb1.mongodb.net/test?retryWrites=true&w=majority";
const localUrl = "mongodb://localhost/shopdb"
mongoose.connect(localUrl, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("MongoDb connected to database succesfully.");
});
mongoose.connection.on("err", () => {
  console.log(err);
});

app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Home API works.",
  });
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server Started at port number: ${port}`);
});
