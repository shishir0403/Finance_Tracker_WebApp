import React, { useState } from "react";

function TransactionForm({ onAdded }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text, amount, type }),
    });
    if (res.ok) {
      setText("");
      setAmount("");
      onAdded();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tx-form">
      <input
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

export default TransactionForm;
