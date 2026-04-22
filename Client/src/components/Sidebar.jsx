import {
  ChevronDown,
  FolderOpenIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { href, NavLink } from "react-router-dom";
import MyTaskSidebar from "./MyTaskSidebar";
import ProjectsSidebar from "./ProjectsSidebar";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      href: "/Dashboard",
      icon: <LayoutDashboardIcon size={18} />,
    },
    { name: "Projects", href: "/projects", icon: <FolderOpenIcon size={18} /> },
    { name: "Team", href: "/Team", icon: <UserIcon size={18} /> },
    { name: "Settings", href: "/settings", icon: <SettingsIcon size={18} /> },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("WorkSpace 1");
  const dropDownRef = useRef();

  const workSpaces = [
    { name: "WorkSpace 1", members: 0 },
    { name: "WorkSpace 2", members: 0 },
  ];

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
      <div className="hidden lg:flex md:flex  flex-col h-screen overflow-y-auto pr-9">
        <div className="lg:w-72 md:w-56 text-sm  border-r border-neutral-300 flex flex-col gap-10 ">
          <div className="z-10 " ref={dropDownRef}>
            <div className="relative " onClick={() => setIsOpen(!isOpen)}>
              <button className="border-b p-[21.5px] border-neutral-300 flex w-full justify-between">
                {selected} <ChevronDown />
              </button>
              {isOpen && (
                <div className="absolute w-full flex flex-col items-center justify-center gap-3 mb-3 bg-white">
                  {workSpaces.map((ws) => (
                    <div
                      key={ws.name}
                      onClick={() => {
                        setSelected(ws.name);
                        setIsOpen(false);
                      }}
                      className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <span>{ws.name}</span>
                      {selected === ws.name && <span>✔</span>}

                    </div>
                  ))}
                  <button className="w-full text-blue-500 border-t p-3 border-neutral-300">+ Add New Workspace</button>
                </div>
              )}
            </div>
          </div>

          <div>
            {menuItems.map((item) => (
              <NavLink
                to={item.href}
                key={item.name}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-1 my-2 mx-4 cursor-pointer rounded transition-all ${isActive ? "flex items-center gap-3 text-black bg-neutral-200 cursor-pointer rounded transition-all" : "hover:bg-neutral-200"}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
          <div>
            <MyTaskSidebar />
            <ProjectsSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
