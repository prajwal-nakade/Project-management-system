import React from "react";
import { MenuIcon, UserIcon } from "lucide-react";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 ml-72 bg-white border-b border-neutral-200 ">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        <button
          type="button"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-neutral-100 transition"
        >
          <MenuIcon size={20} />
        </button>

        <div className=" gap-3 w-full flex justify-center items-center">
          <div className="hidden sm:flex flex-col leading-tight ">
            <p className=" text-xl font-bold text-center text-neutral-900">
              Project Management Application
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center">
            <UserIcon size={18} className="text-neutral-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
