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

  const [newProject, setNewProject] = useState({
    projectname: "",
    projectdesc: "",
    status: "",
    priority: "",
    startdate: "",
    enddate: "",
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
      const response = await fetch("http://localhost:5000/new-project", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify(newProject),
      });

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
      const res = await axios.get("http://localhost:5000/projects/projects", {
        withCredentials: true,
      });

      setProjects(res.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks", {
        withCredentials: true,
      });

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
          <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
            <div className="bg-white p-6 rounded-md w-[450px] relative">
              <button
                className="absolute top-2 right-3 text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>

              <h1 className="text-2xl font-bold text-center mb-5">
                Create New Project
              </h1>

              <form onSubmit={handleSubmit} className="flex flex-col">
                {/* remaining form remains same */}
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
