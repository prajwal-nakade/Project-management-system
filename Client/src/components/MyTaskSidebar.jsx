import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyTaskSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState("");
  const [tasks, setTasks] = useState([]);

  const dropDownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks", {
        withCredentials: true,
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div>
        <div className="w-full flex flex-col justify-start" ref={dropDownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between px-5 cursor-pointer"
          >
            My Tasks <ChevronDown />
          </button>

          {isOpen && (
            <div className="w-full flex flex-col justify-start px-5 text-gray-600">
              {tasks.length === 0 ? (
                <span className="py-2 text-sm">No Tasks Found</span>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => {
                      setIsSelected(task.taskname);
                      setIsOpen(false);
                      navigate(`/tasks/${task.project_id}?task=${task.id}`);
                    }}
                    className={`flex items-center gap-1 py-2 px-2 rounded-md cursor-pointer hover:bg-neutral-200 transition
                      ${isSelected === task.taskname ? "bg-neutral-200" : ""}
                    `}
                  >
                    <ChevronRight size={16} className="text-blue-900" />
                    <span className="truncate">{task.taskname}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyTaskSidebar;
