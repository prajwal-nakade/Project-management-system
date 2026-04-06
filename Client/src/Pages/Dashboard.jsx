import React from "react";
import Layout from "../components/Layout";
import { AlertTriangle, CheckCircle, FolderOpen, Users } from "lucide-react";
const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="px-4 py-3">
              <h1 className="font-bold text-2xl">Welcome back , User</h1>
              <p>Here's what's happening with your projects today</p>
            </div>

            <div className="m-3">
              <button className="border bg-indigo-800 text-white px-3 py-2 rounded-md">
                + New Project
              </button>
            </div>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-sm text-neutral-500 m-2">
                <div className="flex flex-col justify-between border border-neutral-300 shadow  px-3 py-3 gap-5 rounded-md">
                    <div className="flex justify-between ">
                        <h1 className="text-xl">Total Projects</h1>
                        <FolderOpen/>
                    </div>
                    <div>projects in <br />Corp Workspace</div>  
                </div>
                <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
                    <div className="flex justify-between ">
                        <h1 className="text-xl">Completed Projects</h1>
                        <CheckCircle/>
                    </div>
                    <div>0<br />out of 2</div>  
                </div>
                <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
                    <div className="flex justify-between ">
                        <h1 className="text-xl">My Tasks</h1>
                        <Users/>
                    </div>
                    <div>assigned to me</div>  
                </div>
                <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
                    <div className="flex justify-between ">
                        <h1 className="text-xl">Overdue</h1>
                        <AlertTriangle/>
                    </div>
                    <div>projects in <br />Corp Workspace</div>  
                </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
