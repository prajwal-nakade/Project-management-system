import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { ChevronDown, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [isSelected, setIsSelected] = useState("All Status");
  const [selected, setSelected] = useState("All Priority");

  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProject, setNewProject] = useState({
    projectname: "",
    projectdesc: "",
    status: "",
    priority: "",
    startdate: "",
    enddate: "",
  });

  // FETCH PROJECTS
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "https://project-management-system-vvva.vercel.app/projects/projects",
        {
          withCredentials: true,
        },
      );

      setProjects(res.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // HANDLE INPUT CHANGE
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
      const res = await axios.post(
        "https://project-management-system-vvva.vercel.app/new-project",
        newProject,
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

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
    } catch (error) {
      console.error("Project creation failed:", error);
    }
  };

  // DELETE PROJECT
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://project-management-system-vvva.vercel.app/projects/${id}`,
        {
          withCredentials: true,
        },
      );

      // REFRESH PROJECTS
      fetchProjects();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // UPDATE PROJECT STATUS
  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      await axios.put(
        `https://project-management-system-vvva.vercel.app/projects/${projectId}/status`,
        {
          status: newStatus,
        },
        {
          withCredentials: true,
        },
      );

      // REFRESH PROJECTS
      fetchProjects();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const Status = [
    { name: "All Status", id: 1 },
    { name: "todo", id: 2 },
    { name: "inprogress", id: 3 },
    { name: "done", id: 4 },
  ];

  const Priority = [
    { name: "All Priority", id: 1 },
    { name: "High", id: 2 },
    { name: "Medium", id: 3 },
    { name: "Low", id: 4 },
  ];

  // FILTER PROJECTS
  const filteredProjects = projects.filter((project) => {
    const statusMatch =
      isSelected === "All Status"
        ? true
        : project.status.toLowerCase() === isSelected.toLowerCase();

    const priorityMatch =
      selected === "All Priority"
        ? true
        : project.priority.toLowerCase() === selected.toLowerCase();

    return statusMatch && priorityMatch;
  });

  return (
    <>
      <Layout>
        <div className="max-w-6xl flex flex-col mx-auto my-auto">
          {/* HEADER */}
          <div className="flex justify-between items-center mx-5 my-5">
            <div>
              <h1 className="font-bold text-2xl">Projects</h1>
              <p>Manage And Track Your Projects</p>
            </div>

            <button
              className="bg-blue-500 px-3 py-2 rounded-md text-white hover:bg-blue-600 transition"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              + New Project
            </button>
          </div>

          {/* FILTERS */}
          <div className="flex items-start mt-3 mx-5 my-5 gap-5 flex-wrap">
            {/* SEARCH */}
            <div className="relative flex items-center">
              <SearchIcon
                size={20}
                className="absolute left-2.5 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search Projects, tasks here"
                className="rounded-md border border-gray-300 text-gray-900 pl-8 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* STATUS FILTER */}
            <div>
              <div className="border w-40 px-2 py-2 rounded-md border-neutral-300 cursor-pointer relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex justify-center items-center mx-auto"
                >
                  {isSelected} <ChevronDown />
                </button>

                {open && (
                  <div className="absolute bg-white border w-full left-0 top-12 rounded-md shadow-md z-10">
                    {Status.map((e) => (
                      <div
                        key={e.id}
                        className="p-2 hover:bg-gray-100"
                        onClick={() => {
                          setOpen(false);
                          setIsSelected(e.name);
                        }}
                      >
                        {e.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* PRIORITY FILTER */}
            <div>
              <div className="border w-40 px-2 py-2 rounded-md border-neutral-300 cursor-pointer relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex justify-center items-center mx-auto"
                >
                  {selected} <ChevronDown />
                </button>

                {isOpen && (
                  <div className="absolute bg-white border w-full left-0 top-12 rounded-md shadow-md z-10">
                    {Priority.map((s) => (
                      <div
                        key={s.id}
                        className="p-2 hover:bg-gray-100"
                        onClick={() => {
                          setIsOpen(false);
                          setSelected(s.name);
                        }}
                      >
                        {s.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="flex flex-wrap gap-5 mx-5">
            {filteredProjects.length === 0 ? (
              <div className="text-gray-500">No Projects Found</div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/tasks/${project.id}`)}
                  className="w-80 p-4 cursor-pointer hover:bg-gray-100 border border-neutral-300 rounded-md transition"
                >
                  <div className="flex justify-between items-center">
                    <h1 className="font-semibold text-lg capitalize">
                      {project.projectname}
                    </h1>

                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>

                  <p className="text-neutral-600 mt-2">{project.projectdesc}</p>

                  <div className="flex justify-between text-sm text-neutral-600 py-3">
                    <select
                      value={project.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();

                        handleStatusUpdate(project.id, e.target.value);
                      }}
                      className={`px-2 py-1 rounded-md capitalize text-sm border-none outline-none
    ${
      project.status === "active"
        ? "bg-green-300 text-green-950"
        : project.status === "planning"
          ? "bg-yellow-300 text-yellow-950"
          : project.status === "completed"
            ? "bg-blue-300 text-blue-950"
            : "bg-gray-300 text-gray-900"
    }
  `}
                    >
                      <option value="todo">Todo</option>

                      <option value="inprogress">In Progress</option>

                      <option value="done">Done</option>
                    </select>

                    <span className="capitalize">
                      {project.priority} Priority
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 border-t pt-3">
                    <span>
                      Start: {new Date(project.startdate).toLocaleDateString()}
                    </span>

                    <span>
                      End: {new Date(project.enddate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
              <div className="bg-white p-6 rounded-md w-112.5 relative">
                <button
                  className="absolute top-2 right-3 text-2xl"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  ×
                </button>

                <h1 className="flex items-center justify-center text-2xl font-bold mb-5">
                  Create New Project
                </h1>

                <form onSubmit={handleSubmit} className="w-full flex flex-col">
                  <label>Project Name :</label>

                  <input
                    type="text"
                    name="projectname"
                    placeholder="Enter project name"
                    value={newProject.projectname}
                    onChange={handleChange}
                    className="border border-neutral-400 rounded-md px-3 py-2 m-1"
                    required
                  />

                  <label>Description :</label>

                  <textarea
                    name="projectdesc"
                    value={newProject.projectdesc}
                    onChange={handleChange}
                    className="border border-neutral-400 rounded-md px-3 py-2 m-1"
                    required
                  />

                  <div className="w-full flex gap-5 mb-4">
                    <div className="flex-1">
                      <label>Status :</label>

                      <select
                        name="status"
                        value={newProject.status}
                        onChange={handleChange}
                        className="border border-neutral-400 rounded-md px-3 py-2 m-1 w-full"
                        required
                      >
                        <option value="">select Status</option>
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>

                    <div className="flex-1">
                      <label>Priority :</label>

                      <select
                        name="priority"
                        value={newProject.priority}
                        onChange={handleChange}
                        className="border border-neutral-400 rounded-md px-3 py-2 m-1 w-full"
                        required
                      >
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full flex justify-between gap-4">
                    <div className="flex flex-col w-full">
                      <label>Start Date :</label>

                      <input
                        type="date"
                        name="startdate"
                        value={newProject.startdate}
                        onChange={handleChange}
                        className="border border-neutral-400 rounded-md px-3 py-2 m-1"
                        required
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <label>End Date :</label>

                      <input
                        type="date"
                        name="enddate"
                        value={newProject.enddate}
                        onChange={handleChange}
                        className="border border-neutral-400 rounded-md px-3 py-2 m-1"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-32 flex justify-center my-5 mx-auto rounded-md bg-blue-700 text-white py-2 hover:bg-blue-500 transition"
                  >
                    Save Project
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Projects;
