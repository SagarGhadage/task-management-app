import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { deleteTask, getAllTasks } from "../../api/api";
import { useSnackbar } from "notistack";

const Task = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { taskId } = useParams(); // Extract the parameter from the URL
  const navigate = useNavigate();
  
  const [isEdit, setIsEdit] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);

  // console.log(taskId, "taskId", taskData, "taskData");
  React.useEffect(() => {
    if (taskId) {
      setIsEdit(true);
    }
  }, [taskId]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTasks();
        setTasks(response?.tasks || []);
        enqueueSnackbar("Tasks fetched successfully!", { variant: "success" });
      } catch (error) {
        console.error("Error fetching tasks:", error);
        enqueueSnackbar("Failed to fetch tasks.", { variant: "error" });
      }
    };
    fetchTasks();
  }, []);
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      enqueueSnackbar("Task deleted successfully!", { variant: "success" });
      navigate("/tasks");
    } catch (error) {
      console.error("Error deleting task:", error);
      enqueueSnackbar("Failed to delete task.", { variant: "error" });
    }
  };
  const onView = async (taskId) => {
    navigate(`/tasks/${taskId}`);
  };
  const onEdit = async (taskId) => {
    navigate(`/tasks/update/${taskId}`);
  };
  return (
    <div className="task-container mt-4 p-6">
      <Outlet context={{ isEdit, setIsEdit, tasks:tasks?.length?tasks:[], setTasks,handleDelete,onView,onEdit }} />{" "}
      {/* Renders the nested route components */}
    </div>
  );
};

export default Task;
