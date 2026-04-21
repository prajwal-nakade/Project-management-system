import React from "react";
import Layout from "../components/Layout";
import { AlertTriangle, CheckCircle, FolderOpen, Users } from "lucide-react";
import ProjectOverview from "./ProjectOverview";
import Mytask from "./Mytask";
import OverdueDisplay from "./OverdueDisplay";
import RecentActivity from "./RecentActivity";
const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="max-w-6xl flex flex-col justify-center mx-auto text-sm ">
          <div className="flex justify-between items-center">
            <div className="px-4 py-3">
              <h1 className="font-bold text-xl">Welcome back , User</h1>
              <p className="text-neutral-500">
                Here's what's happening with your projects today
              </p>
            </div>

            <div className="m-3">
              <button className="border bg-indigo-800 text-white px-3 py-2 rounded-md">
                + New Project
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 gap-6 text-sm text-neutral-500 mx-2 my-8">
            <div className="flex flex-col justify-between border border-neutral-300 shadow  px-3 py-3 gap-5 rounded-md">
              <div className="flex justify-between ">
                <h1 className="text-xl">Total Projects</h1>
                <FolderOpen
                  className="text-blue-600 bg-blue-100 px-2 py-2 rounded-md"
                  size={40}
                />
              </div>
              <div>projects in Corp Workspace</div>
            </div>
            <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
              <div className="flex justify-between ">
                <h1 className="text-xl">Completed Projects</h1>
                <CheckCircle
                  className="text-green-600 bg-green-100 px-2 py-2 rounded-md"
                  size={40}
                />
              </div>
              <div>0 out of 2</div>
            </div>
            <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
              <div className="flex justify-between ">
                <h1 className="text-xl">My Tasks</h1>
                <Users
                  className="text-purple-600 bg-purple-100 px-2 py-2 rounded-md"
                  size={40}
                />
              </div>
              <div>assigned to me</div>
            </div>
            <div className="flex flex-col justify-between border border-neutral-300 shadow px-3 py-3 gap-5 rounded-md">
              <div className="flex justify-between ">
                <h1 className="text-xl">Overdue</h1>
                <AlertTriangle
                  className="text-yellow-600 bg-yellow-100 px-2 py-2 rounded-md"
                  size={40}
                />
              </div>
              <div>projects in Corp Workspace</div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Section */}
            <div className="flex flex-col gap-4 flex-1">
              <ProjectOverview />
              <RecentActivity />
            </div>

            {/* Right Section */}
            <div className="flex flex-col gap-4 w-full lg:w-1/3">
              <Mytask />
              <OverdueDisplay />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
