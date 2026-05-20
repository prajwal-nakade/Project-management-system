import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OverdueDisplay = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOverdueTasks();
  }, []);

  const fetchOverdueTasks = async () => {
    try {
      const res = await axios.get(
        "https://project-management-system-vvva.vercel.app/tasks",
        {
          withCredentials: true,
        },
      );

      const overdue = res.data.tasks.filter(
        (task) => new Date(task.duedate) < new Date() && task.status !== "done",
      );

      setTasks(overdue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded-md shadow p-4 m-3 bg-white">
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-red-500" />

        <h2 className="font-bold text-lg">Overdue Tasks</h2>
      </div>

      {/* EMPTY */}
      {tasks.length === 0 ? (
        <p className="text-gray-500">No overdue tasks</p>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() =>
                navigate(`/tasks/${task.project_id}?task=${task.id}`)
              }
              className="border border-red-300 bg-red-50 rounded-md p-3 cursor-pointer hover:bg-red-100 transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold capitalize">{task.taskname}</h3>

                <span className="text-xs bg-red-200 text-red-700 px-2 py-1 rounded">
                  Overdue
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Project: {task.projectname}
              </p>

              <p className="text-sm text-gray-600">
                Due: {new Date(task.duedate).toLocaleDateString()}
              </p>

              <p className="text-sm text-red-600 mt-1 capitalize">
                Status: {task.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverdueDisplay;
