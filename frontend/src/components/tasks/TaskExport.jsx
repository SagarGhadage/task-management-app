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
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleExport}
    >
      Export to Excel
    </button>
  );
}
