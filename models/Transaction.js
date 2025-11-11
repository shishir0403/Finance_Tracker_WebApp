import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
