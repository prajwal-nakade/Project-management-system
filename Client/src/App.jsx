import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Layout from "./components/Layout";
import Projects from "./Pages/Projects";
import Team from "./Pages/Team";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/Team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
