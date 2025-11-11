import React from "react";
import "./AuthPage.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage.js";
import Dashboard from "./Dashboard.js";
import PrivateRoute from "./PrivateRoute.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
