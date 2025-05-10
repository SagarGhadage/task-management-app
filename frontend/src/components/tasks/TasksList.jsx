import React, { useEffect, useState } from "react";
import Table from "../Table.jsx/Table";
import TaskExport from "./TaskExport";
import { useSnackbar } from "notistack";
import { useNavigate, useOutletContext } from "react-router-dom";
import TaskCard from "./TaskCard";

const TaskList = () => {
  // const { enqueueSnackbar } = useSnackbar();
  const [isTable, setIsTable] = useState(true);
  const navigate = useNavigate();
  const {tasks, setTasks,handleDelete,onView,onEdit} = useOutletContext();  

  const headers = ["Title", "Description", "Effort (days)", "Due Date"];
  const rows = tasks?.map((task) => ({
    title: task.title,
    description: task.description,
    effortToComplete: task.effortToComplete,
    dueDate: task.dueDate,
    id: task.id,
  }));

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4 gap-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
          Task{" "}
          <button
            onClick={() => setIsTable(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
          >
            Table
          </button>{" "}
          <button
            onClick={() => setIsTable(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
          >
            Grid
          </button>
        </h2>
        <div className="mb-4">
          <button
            onClick={() => navigate("/tasks/create")}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Create Task
          </button>
        </div>
        <div className="mb-4">
          <button
            onClick={() => navigate("/tasks/import")}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Import Tasks
          </button>
        </div>
        <div className="mb-4">
          <TaskExport />
        </div>
      </div>
      {isTable && (
        <Table
          headers={headers}
          list={tasks||[]}
          rows={rows}
          onEdit={onEdit}
          onDelete={handleDelete}
          onView={onView}
        />
      )}
      {!isTable && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks?.map((task) => (
            <TaskCard key={task?.id} taskDetails={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
