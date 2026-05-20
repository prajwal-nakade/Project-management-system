import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useLocation, useParams } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { projectId } = useParams();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const selectedTaskId = queryParams.get("task");

  // OVERDUE CHECK
  const isOverdue = (duedate, status) => {
    return new Date(duedate) < new Date() && status !== "done";
  };

  // NEW TASK STATE
  const [newTask, setNewTask] = useState({
    taskname: "",
    taskdesc: "",
    status: "",
    priority: "",
    duedate: "",
    project_id: projectId,
  });

  // FETCH TASKS
  useEffect(() => {
    fetchTasks();
  }, [projectId, location.search]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `https://project-management-system-vvva.vercel.app/tasks/${projectId}`,
        {
          withCredentials: true,
        },
      );

      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CREATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://project-management-system-vvva.vercel.app/new-task",
        newTask,
        {
          withCredentials: true,
        },
      );

      // REFRESH TASKS
      fetchTasks();

      // CLOSE MODAL
      setIsModalOpen(false);

      // RESET FORM
      setNewTask({
        taskname: "",
        taskdesc: "",
        status: "",
        priority: "",
        duedate: "",
        project_id: projectId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE TASK
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://project-management-system-vvva.vercel.app/tasks/${id}`,
        {
          withCredentials: true,
        },
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // UPDATE TASK STATUS
  const updateTaskStatus = async (taskId, status) => {
    try {
      await axios.put(
        `https://project-management-system-vvva.vercel.app/tasks/${taskId}`,
        {
          status,
        },
        {
          withCredentials: true,
        },
      );

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mx-5 my-5">
          <div>
            <h1 className="font-bold text-2xl">Tasks</h1>

            <p>Manage your project tasks</p>
          </div>

          <button
            className="bg-blue-500 px-3 py-2 rounded-md text-white hover:bg-blue-600 transition"
            onClick={() => setIsModalOpen(true)}
          >
            + New Task
          </button>
        </div>

        {/* TASKS */}
        <div className="flex flex-wrap gap-5 mx-5">
          {tasks.length === 0 ? (
            <div className="text-gray-500">No Tasks Found</div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`w-80 p-4 border rounded-md transition cursor-pointer
                  ${
                    Number(selectedTaskId) === task.id
                      ? "border-blue-500 bg-blue-50"
                      : isOverdue(task.duedate, task.status)
                        ? "border-red-400 bg-red-50"
                        : "border-neutral-300 hover:bg-gray-100"
                  }
                `}
              >
                {/* TOP */}
                <div className="flex justify-between items-center">
                  <h1 className="font-bold capitalize">{task.taskname}</h1>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>

                {/* DESCRIPTION */}
                <p className="text-gray-600 mt-2">{task.taskdesc}</p>

                {/* TASK INFO */}
                <div className="mt-4 flex flex-col gap-2 text-sm">
                  <p>
                    Project:{" "}
                    <span className="font-semibold capitalize">
                      {task.projectname}
                    </span>
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="capitalize">
                      Status:
                      <span
                        className={`ml-2 font-semibold
        ${
          task.status === "done"
            ? "text-green-600"
            : task.status === "inprogress"
              ? "text-yellow-600"
              : "text-gray-600"
        }
      `}
                      >
                        {task.status}
                      </span>
                    </p>

                    {task.status !== "done" && (
                      <button
                        onClick={() => updateTaskStatus(task.id, "done")}
                        className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600 transition"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>

                  <p className="capitalize">Priority: {task.priority}</p>

                  <p>Due: {new Date(task.duedate).toLocaleDateString()}</p>
                </div>

                {/* OVERDUE BADGE */}
                {isOverdue(task.duedate, task.status) && (
                  <div className="mt-4">
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-sm font-medium">
                      Overdue
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-[450px] relative">
              {/* CLOSE */}
              <button
                className="absolute top-2 right-3 text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>

              {/* TITLE */}
              <h1 className="text-2xl font-bold text-center mb-5">
                Create Task
              </h1>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="flex flex-col">
                <label>Task Name :</label>

                <input
                  type="text"
                  name="taskname"
                  value={newTask.taskname}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 m-1"
                  required
                />

                <label>Description :</label>

                <textarea
                  name="taskdesc"
                  value={newTask.taskdesc}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 m-1"
                  required
                />

                <label>Status :</label>

                <select
                  name="status"
                  value={newTask.status}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 m-1"
                  required
                >
                  <option value="">Select Status</option>

                  <option value="todo">To Do</option>

                  <option value="inprogress">In Progress</option>

                  <option value="done">Done</option>
                </select>

                <label>Priority :</label>

                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 m-1"
                  required
                >
                  <option value="">Select Priority</option>

                  <option value="high">High</option>

                  <option value="medium">Medium</option>

                  <option value="low">Low</option>
                </select>

                <label>Due Date :</label>

                <input
                  type="date"
                  name="duedate"
                  value={newTask.duedate}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 m-1"
                  required
                />

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 rounded-md mt-5 hover:bg-blue-500 transition"
                >
                  Save Task
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tasks;
