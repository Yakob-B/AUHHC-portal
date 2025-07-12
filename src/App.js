import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SchoolsPage from "./SchoolsPage";
import DepartmentsPage from "./DepartmentsPage";
import DepartmentDetailPage from "./DepartmentDetailPage";
import NavBar from "./components/NavBar";
import Breadcrumb from "./components/Breadcrumb";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for user preference
    return localStorage.getItem("theme") === "dark" || false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      <Router>
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schools" element={<SchoolsPage />} />
          <Route path="/schools/:schoolId/departments" element={<DepartmentsPage />} />
          <Route path="/schools/:schoolId/departments/:departmentId" element={<DepartmentDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
