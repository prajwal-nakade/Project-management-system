import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Layout from "./components/Layout";
import Projects from "./Pages/Projects";
import Team from "./Pages/Team";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";
import ProjectAnalytics from "./Pages/ProjectAnalytics";
import ProjectCalendar from "./Pages/ProjectCalendar";
import Tasks from "./Pages/Tasks";
import Settings from "./Pages/Settings";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={ <Dashboard />}
        />
        <Route path="/projects" element={<Projects />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/tasks/:projectId" element={<Tasks />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/projects/:projectId/calendar"
          element={<ProjectCalendar />}
        />

        <Route
          path="/projects/:projectId/analytics"
          element={<ProjectAnalytics />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
