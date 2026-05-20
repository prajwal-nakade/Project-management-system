import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { AlertTriangle, CheckCircle, FolderOpen, Users } from "lucide-react";

import ProjectOverview from "./ProjectOverview";
import Mytask from "../components/Mytask";
import OverdueDisplay from "./OverdueDisplay";
import RecentActivity from "./RecentActivity";

import axios from "axios";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  const selectedWorkspace = JSON.parse(localStorage.getItem("workspace"));

  const [newProject, setNewProject] = useState({
    projectname: "",
    projectdesc: "",
    status: "",
    priority: "",
    startdate: "",
    enddate: "",
    workspace_id: selectedWorkspace?.id,
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // CREATE PROJECT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://project-management-system-vvva.vercel.app/new-project",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            ...newProject,
            workspace_id: selectedWorkspace?.id,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      // REFRESH PROJECTS
      fetchProjects();

      // CLOSE MODAL
      setIsModalOpen(false);

      // RESET FORM
      setNewProject({
        projectname: "",
        projectdesc: "",
        status: "",
        priority: "",
        startdate: "",
        enddate: "",
      });

      alert("Project Created Successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const workspace = JSON.parse(localStorage.getItem("workspace"));

      const res = await axios.get(
        `https://project-management-system-vvva.vercel.app/projects/projects?workspace_id=${workspace.id}`,
        {
          withCredentials: true,
        },
      );

      setProjects(res.data.projects);
    } catch (error) {
      console.error(error);
    }
  };
  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const workspace = JSON.parse(localStorage.getItem("workspace"));

      const res = await axios.get(
        `https://project-management-system-vvva.vercel.app/tasks?workspace_id=${workspace.id}`,
        {
          withCredentials: true,
        },
      );
      setTasks(res.data.tasks);

      // OVERDUE FILTER
      const overdue = res.data.tasks.filter(
        (task) => new Date(task.duedate) < new Date() && task.status !== "done",
      );

      setOverdueTasks(overdue);
    } catch (error) {
      console.error(error);
    }
  };

  // COMPLETED PROJECTS
  const completedProjects = projects.filter(
    (project) => project.status === "done",
  );

  // INITIAL LOAD
  useEffect(() => {
    const init = async () => {
      await Promise.all([fetchProjects(), fetchTasks()]);
    };

    init();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl flex flex-col justify-center mx-auto text-sm">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div className="px-4 py-3">
            <h1 className="font-bold text-xl">Welcome back, User</h1>

            <p className="text-neutral-500">
              Here's what's happening with your projects today
            </p>
          </div>

          <div className="m-3">
            <button
              className="border bg-indigo-800 text-white px-3 py-2 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              + New Project
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 text-sm text-neutral-500 mx-2 my-8">
          {/* TOTAL PROJECTS */}
          <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-xl">Total Projects</h1>

              <FolderOpen
                className="text-blue-600 bg-blue-100 px-2 py-2 rounded-md"
                size={40}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-3xl font-bold text-black">
                {projects.length}
              </span>

              <span>Projects in workspace</span>
            </div>
          </div>

          {/* COMPLETED */}
          <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-xl">Completed Projects</h1>

              <CheckCircle
                className="text-green-600 bg-green-100 px-2 py-2 rounded-md"
                size={40}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-3xl font-bold text-black">
                {completedProjects.length}
              </span>

              <span>Completed successfully</span>
            </div>
          </div>

          {/* TASKS */}
          <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-xl">My Tasks</h1>

              <Users
                className="text-purple-600 bg-purple-100 px-2 py-2 rounded-md"
                size={40}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-3xl font-bold text-black">
                {tasks.length}
              </span>

              <span>Assigned tasks</span>
            </div>
          </div>

          {/* OVERDUE */}
          <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
            <div className="flex justify-between">
              <h1 className="text-xl">Overdue</h1>

              <AlertTriangle
                className="text-yellow-600 bg-yellow-100 px-2 py-2 rounded-md"
                size={40}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-3xl font-bold text-black">
                {overdueTasks.length}
              </span>

              <span>Need attention</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <ProjectOverview />
            <RecentActivity />
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-1/3">
            <Mytask />
            <OverdueDisplay />
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="bg-white p-6 rounded-md w-100 relative">
              <button
                className="absolute top-2 right-3 text-2xl"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                X
              </button>

              <h1 className="flex items-center justify-center text-2xl font-bold mb-3">
                Create New Project
              </h1>
              <form
                action=""
                className="w-full flex flex-col justify-center mx-auto my-auto"
              >
                <label htmlFor="">Project Name :</label>
                <input
                  type="text"
                  placeholder="Enter the Project name here"
                  className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                />

                <label htmlFor="">Description :</label>
                <textarea
                  name="description"
                  id=""
                  className="border border-neutral-400 rounded-md px-3 py-1 m-1 "
                >
                  Describe Your Project
                </textarea>

                <div className="w-ful flex gap-11 mb-4">
                  <div className="  ">
                    <label htmlFor="" className="flex items-center">
                      Status :
                    </label>
                    <select
                      name=""
                      id=""
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                    >
                      <option value="">select Status</option>
                      <option value="todo">To Do</option>
                      <option value="inprogress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div className=" ">
                    <label htmlFor="" className="flex items-center">
                      Prioroty :
                    </label>
                    <select
                      name=""
                      id=""
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                    >
                      <option value="">Priority</option>
                      <option value="todo">High</option>
                      <option value="inprogress">Medium</option>
                      <option value="done">Low</option>
                    </select>
                  </div>
                </div>

                <div className="w-ful flex justify-between">
                  <div>
                    <label htmlFor="">Start Date :</label>
                    <input
                      type="date"
                      className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                    />
                  </div>

                  <div>
                    <label htmlFor="">End Date :</label>
                    <input
                      type="date"
                      className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <button className="w-30 flex justify-center my-4 border mx-auto rounded-md bg-blue-700 text-white  hover:bg-blue-400 ">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
