import React, { useContext } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
// import { useAuth } from "../../context/AuthContex.jsx";
import { useNavigate, Link } from "react-router-dom";
import { LightMode, DarkMode, AccountCircle } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContex.jsx";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  console.log(user?.email);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow-md">
        <Link to='/' className="text-2xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors duration-300">
          Task Manager
        </Link>

        {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/tasks"
          className="text-gray-800 dark:text-gray-100 hover:text-blue-500"
        >
          View Tasks
        </Link>
        <Link
          to="/tasks/import"
          className="text-gray-800 dark:text-gray-100 hover:text-blue-500"
        >
          Import Tasks
        </Link>
        {/* <Link
          to="/tasks/export"
          className="text-gray-800 dark:text-gray-100 hover:text-blue-500"
        >
          Export Tasks
        </Link> */}
        <Link
          to="/tasks/create"
          className="text-gray-800 dark:text-gray-100 hover:text-blue-500"
        >
          Create Task
        </Link>
      </div>
      <div className="flex items-center gap-6">
        {!user?.email ? (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Register
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-100"
            >
              <AccountCircle className="text-3xl" />
              <span className="text-lg font-medium">{user.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === "light" ? <LightMode /> : <DarkMode />}
        </button>
      </div>
    </nav>
  );
}
