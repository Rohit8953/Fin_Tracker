import React from "react";
import Page from "./components/Main/Page";
import SignUp from "./components/LoginSignUp/SignUp";
import Login from "./components/LoginSignUp/LogIn";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions/index";
import Insights from "./components/Insights";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Page />}>
  <Route index element={<Dashboard />} />
  <Route path="transactions" element={<Transactions />} />
  <Route path="insights" element={<Insights />} />
</Route>

      </Routes>
    </div>
  );
}