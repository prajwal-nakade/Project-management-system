import {
  ChevronDown,
  FolderOpenIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserIcon,
  BriefcaseBusiness,
} from "lucide-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import MyTaskSidebar from "./MyTaskSidebar";
import ProjectsSidebar from "./ProjectsSidebar";

const Sidebar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboardIcon size={18} />,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: <FolderOpenIcon size={18} />,
    },
    {
      name: "Team",
      href: "/team",
      icon: <UserIcon size={18} />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <SettingsIcon size={18} />,
    },
  ];

  const [workspaces, setWorkspaces] = useState([]);

  const [selectedWorkspace, setSelectedWorkspace] = useState(
    localStorage.getItem("workspace")
      ? JSON.parse(localStorage.getItem("workspace"))
      : null,
  );

  const [workspaceName, setWorkspaceName] = useState("");

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await axios.get("http://localhost:5000/workspaces", {
        withCredentials: true,
      });

      setWorkspaces(res.data.workspaces);

      // DEFAULT WORKSPACE
      if (!selectedWorkspace && res.data.workspaces.length > 0) {
        setSelectedWorkspace(res.data.workspaces[0]);

        localStorage.setItem(
          "workspace",
          JSON.stringify(res.data.workspaces[0]),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createWorkspace = async () => {
    try {
      if (!workspaceName.trim()) return;

      const res = await axios.post(
        "http://localhost:5000/workspaces",
        {
          name: workspaceName,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

      // REFRESH LIST
      fetchWorkspaces();

      // RESET INPUT
      setWorkspaceName("");

      // CLOSE DROPDOWN
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const selectWorkspace = (workspace) => {
    setSelectedWorkspace(workspace);

    localStorage.setItem("workspace", JSON.stringify(workspace));

    setIsOpen(false);

    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className="hidden md:flex lg:flex flex-col  w-72 h-screen bg-white border-r border-neutral-200 sticky top-0 overflow-hidden">
      {/* HEADER */}
      <div className="h-16 border-b border-neutral-200 flex items-center px-5">
        <div className="flex items-center gap-3">
          <div className="bg-black text-white p-2 rounded-xl">
            <BriefcaseBusiness size={18} />
          </div>

          <div>
            <h1 className="font-semibold text-sm">Project Manager</h1>

            <p className="text-xs text-neutral-500">Workspace Platform</p>
          </div>
        </div>
      </div>

      {/* WORKSPACE DROPDOWN */}
      <div
        className="relative px-4 py-4 border-b border-neutral-200"
        ref={dropdownRef}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-neutral-100 hover:bg-neutral-200 transition-all rounded-xl px-4 py-3"
        >
          <div className="text-left">
            <p className="text-sm font-medium">
              {selectedWorkspace?.name || "Select Workspace"}
            </p>

            <p className="text-xs text-neutral-500">Active Workspace</p>
          </div>

          <ChevronDown
            size={18}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-24 left-4 right-4 bg-white border border-neutral-200 rounded-2xl shadow-xl overflow-hidden z-50">
            {workspaces.map((ws) => (
              <button
                key={ws.id}
                onClick={() => selectWorkspace(ws)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-neutral-100 transition-all"
              >
                <div className="text-left">
                  <p className="text-sm font-medium">{ws.name}</p>
                </div>

                {selectedWorkspace?.id === ws.id && (
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                )}
              </button>
            ))}

            <div className="border-t border-neutral-200 p-3 flex gap-2">
              <input
                type="text"
                placeholder="Workspace Name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="border rounded-md px-2 py-1 text-sm w-full"
              />

              <button
                onClick={createWorkspace}
                className="bg-blue-600 text-white px-3 rounded-md hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <div className="px-3 py-5">
        <p className="text-xs uppercase text-neutral-400 font-semibold px-3 mb-3">
          Main Menu
        </p>

        <div className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* SCROLLABLE SUBMENU */}
      <div className="flex-1 overflow-y-auto px-3 pb-6 space-y-6">
        {/* MY TASKS */}
        <div className="bg-neutral-50 rounded-2xl p-3">
          <MyTaskSidebar />
        </div>

        {/* PROJECTS */}
        <div className="bg-neutral-50 rounded-2xl p-3">
          <ProjectsSidebar />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
