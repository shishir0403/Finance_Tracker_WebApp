import React, { useEffect, useState } from "react";

function FinanceTracker() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTransactions(data);
  };

  const handleAdd = async (e) => {
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
      fetchTransactions();
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Finance Tracker</h2>
      <form onSubmit={handleAdd}>
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
      <ul>
        {transactions.map((t) => (
          <li key={t._id}>
            {t.text} - ₹{t.amount} ({t.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FinanceTracker;
