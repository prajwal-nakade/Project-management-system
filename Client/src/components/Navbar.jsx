import React from "react";
import { SearchIcon, PanelLeft } from "lucide-react";
import { MoonIcon, SunIcon } from "lucide-react";


const Navbar = () => {

  return (
    <>
      <div className="fixed z-50 flex items-start w-full h-17 px-2 pb-2 border-b border-neutral-300 ">
        <div className="flex w-full gap-4 items-center">
          <button className="mt-3">
            <PanelLeft size={20} />
          </button>

          <div className="relative flex justify-center items-center mt-3">
            <SearchIcon size={20} className="absolute left-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search Projects,tasks here"
              className="rounded-md border border-gray-300 text-gray-900 pl-8 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus-border-blue-500 transition"
            />
          </div>
        </div>

        <div className="flex justify-between gap-8 items-center px-5 mt-3 ">
          <button className="border border-neutral-400 px-1 py-1 rounded-md">
            {/* {
                    theme === "light" ?
                    (<MoonIcon/>) : (<SunIcon />)
                } */}
            <MoonIcon />
          </button>

          <img
            src="profile_img_a.svg"
            alt="User Avatar"
            className="size-7 rounded-full mr-8"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
