import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
});

export default mongoose.model("Order", orderSchema, "orders");
