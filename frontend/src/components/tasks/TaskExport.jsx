import React from "react";
import { useOutletContext } from "react-router-dom";
import { exportTasks } from "../../api/api";
// import { exportTasks } from '../../api/api'

export default function TaskExport({ user }) {
  const handleExport = async () => {
    try {
      // console.log("Exporting tasks...");
      const response = await exportTasks(user);
      if (!response?.size) {
        throw new Error("Failed to export tasks");
      }
      console.log(response?.size, ": buffer size");
      const blob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tasks.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      console.log("Exported tasks successfully");
    } catch (error) {
      console.error("Error exporting tasks:", error);
      alert("An error occurred while exporting tasks.");
    }
  };
  return (
    <button
      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
      onClick={handleExport}
    >
      Export to Excel
    </button>
  );
}
