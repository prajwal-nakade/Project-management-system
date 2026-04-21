import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Loader2Icon } from "lucide-react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        
        <div className=" flex flex-col  w-full ">
          
            <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          
          <main className=" mt-16 flex-1 overflow-y-auto   ">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
