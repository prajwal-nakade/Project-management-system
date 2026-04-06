import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {Loader2Icon } from 'lucide-react';

const Layout = ({children}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  return (
    <>
      <div className="flex overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-col overflow-hidden w-full">
           <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto" >{children}</main>
        </div>
       
      </div>

    </>
  );
};

export default Layout;
