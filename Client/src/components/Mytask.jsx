import { UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Mytask = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "https://project-management-system-vvva.vercel.app/tasks",
        {
          withCredentials: true,
        },
      );
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <>
      <div className="border lg:w-65 md:w-65 sm:w-60 m-3 flex flex-col items-center rounded-md border-neutral-300 shadow">
        <div className="w-full border-b border-neutral-300 px-4 py-3 pb-2">
          <div>
            <h2 className="flex items-center gap-3">
              <UserIcon size={16} />
              My Task
            </h2>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 p-3 text-sm">
          {tasks.length === 0 ? (
            <div className="text-gray-500">No Tasks Found</div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                onClick={() =>
                  navigate(`/tasks/${task.project_id}?task=${task.id}`)
                }
                className="hover:bg-gray-100 rounded-md p-3 cursor-pointer transition"
              >
                <span className="font-medium capitalize">{task.taskname}</span>
                <p className="font-light capitalize">
                  {task.status} • {task.priority} priority
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Mytask;
