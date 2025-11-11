import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addTransaction = async (req, res) => {
  const { text, amount, type } = req.body;
  if (!text || !amount || !type)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const newTx = await Transaction.create({
      text,
      amount,
      type,
      user: req.user.id,
    });
    res.status(201).json(newTx);
  } catch (err) {
    res.status(500).json({ message: "Error creating transaction" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!tx) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting transaction" });
  }
};
