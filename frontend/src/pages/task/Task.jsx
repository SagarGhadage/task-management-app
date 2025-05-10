import React from "react";
import { Outlet, useParams } from "react-router-dom";

const Task = () => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [taskData, setTaskData] = React.useState(null);
  const { taskId } = useParams(); // Extract the parameter from the URL
  console.log(taskId, "taskId" , taskData, "taskData");
  React.useEffect(() => {
    if (taskId) {
      setIsEdit(true);
      // Fetch the task data using the taskId
      // setTaskData(fetchedTaskData);
    }
  }, [taskId]);
  return (
    <div>
      
      <div className="task-container mt-4 p-6">
        <Outlet context={{isEdit,setIsEdit,taskData,setTaskData}}/> {/* Renders the nested route components */}
      </div>
    </div>
  );
};

export default Task;
