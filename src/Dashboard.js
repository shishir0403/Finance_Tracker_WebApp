import React, { useEffect, useState } from "react";
import ChartView from "./components/ChartView.js";
import TransactionForm from "./components/TransactionForm.js";
import "./Dashboard.css";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="top-nav">
        <h2 className="brand">💰 Finance Tracker</h2>
        <div className="nav-user">
          <span>
            Hello, <strong>Shishir 👋</strong>
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Title Section */}
      <div className="dashboard-title">
        <h1>💼 Finance Tracker Dashboard</h1>
        <p>Manage your income, expenses, and insights in one place.</p>
      </div>

      {/* Main Dashboard Section */}
      <main className="main-section">
        <div className="overview">
          <div className="card summary-card">
            <h3>Total Balance</h3>
            <p className="balance">₹{totalIncome - totalExpense}</p>
          </div>
          <div className="card income-card">
            <h3>Income</h3>
            <p>₹{totalIncome}</p>
          </div>
          <div className="card expense-card">
            <h3>Expense</h3>
            <p>₹{totalExpense}</p>
          </div>
        </div>

        <div className="grid-layout">
          <div className="card chart-card">
            <h3>Spending Breakdown</h3>
            <ChartView income={totalIncome} expense={totalExpense} />
          </div>

          <div className="card transaction-card">
            <h3>Add New Transaction</h3>
            <TransactionForm onAdded={fetchTransactions} />
            <h4>Recent Transactions</h4>
            <ul className="transaction-list">
              {transactions.length === 0 ? (
                <p className="empty">No transactions yet.</p>
              ) : (
                transactions.slice(0, 5).map((t) => (
                  <li
                    key={t._id}
                    className={
                      t.type === "income" ? "income-item" : "expense-item"
                    }
                  >
                    <span>{t.text}</span>
                    <span>₹{t.amount}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="insights-section card">
          <h3>Insights</h3>
          <p>
            💡 You’ve spent{" "}
            <strong>
              {Math.round((totalExpense / totalIncome) * 100 || 0)}%
            </strong>{" "}
            of your income.
          </p>
          <p>
            📈 Your current balance trend is{" "}
            <strong>
              {totalIncome - totalExpense > 0
                ? "Positive ✅"
                : "Negative ⚠️"}
            </strong>
          </p>
          <p>🕒 Last updated: {new Date().toLocaleString()}</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
