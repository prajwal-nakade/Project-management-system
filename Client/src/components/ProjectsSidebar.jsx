import {
  ArrowRight,
  ChevronDown,
  KanbanIcon,
  ChartColumnIcon,
  CalendarIcon,
  SettingsIcon,
} from "lucide-react";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectsSidebar = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const subMenus = [
    {
      name: "Tasks",
      icon: <KanbanIcon size={16} />,
      path: "tasks",
    },
    {
      name: "Analytics",
      icon: <ChartColumnIcon size={16} />,
      path: "analytics",
    },
    {
      name: "Calendar",
      icon: <CalendarIcon size={16} />,
      path: "calendar",
    },
    {
      name: "Settings",
      icon: <SettingsIcon size={16} />,
      path: "settings",
    },
  ];

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://project-management-system-vvva.vercel.app/projects",
        {
          withCredentials: true,
        },
      );

      setProjects(response.data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // HANDLE SUBMENU NAVIGATION
  const handleNavigation = (projectId, menu) => {
    switch (menu.path) {
      case "tasks":
        navigate(`/tasks/${projectId}`);
        break;

      case "analytics":
        navigate(`/projects/${projectId}/analytics`);
        break;

      case "calendar":
        navigate(`/projects/${projectId}/calendar`);
        break;

      case "settings":
        navigate(`/projects/${projectId}/settings`);
        break;

      default:
        break;
    }
  };

  return (
    <div className="w-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h1 className="text-xs font-semibold tracking-wider text-neutral-500">
          PROJECTS
        </h1>

        <ArrowRight size={16} className="text-neutral-500" />
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-sm text-neutral-500 px-2 py-2">
          Loading projects...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && projects.length === 0 && (
        <div className="text-sm text-neutral-400 px-2 py-2">
          No projects found
        </div>
      )}

      {/* PROJECT LIST */}
      <div className="flex flex-col gap-2">
        {projects.map((project) => {
          const isOpen = openProject === project.id;

          return (
            <div
              key={project.id}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden"
            >
              {/* PROJECT BUTTON */}
              <button
                onClick={() => setOpenProject(isOpen ? null : project.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-all"
              >
                <span className="text-sm font-medium text-neutral-700 truncate">
                  {project.projectname}
                </span>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* SUB MENUS */}
              {isOpen && (
                <div className="border-t border-neutral-100 px-2 py-2 flex flex-col gap-1">
                  {subMenus.map((menu, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(project.id, menu)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-600 hover:bg-black hover:text-white transition-all"
                    >
                      {menu.icon}

                      <span>{menu.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsSidebar;
