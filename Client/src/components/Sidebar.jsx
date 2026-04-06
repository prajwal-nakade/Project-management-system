import {
  FolderOpenIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import React from "react";
import { href, NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", href: "/", icon: <LayoutDashboardIcon /> },
    { name: "Projects", href: "/projects", icon: <FolderOpenIcon /> },
    { name: "Team", href: "/Team", icon: <UserIcon /> },
    { name: "Settings", href: "/settings", icon: <SettingsIcon /> },
  ];

  return (
    <>
      <div className="w-80 min-h-screen border-r border-neutral-300 flex flex-col gap-10">
        <div>
          <h1 className="border-b p-[21.5px] border-neutral-300">
            WorkSpaceDropDown
          </h1>
        </div>

        <div>
          {menuItems.map((item) => (
            <NavLink
              to={item.href}
              key={item.name}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 m-1 cursor-pointer rounded transition-all ${isActive ? "flex items-center gap-3 text-white bg-black cursor-pointer rounded transition-all" : "hover:bg-neutral-400"}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
