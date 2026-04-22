import React, { useState } from "react";
import Layout from "../components/Layout";
import { AlertTriangle, CheckCircle, FolderOpen, Users } from "lucide-react";
import ProjectOverview from "./ProjectOverview";
import Mytask from "./Mytask";
import OverdueDisplay from "./OverdueDisplay";
import RecentActivity from "./RecentActivity";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

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
              <button
                className="border bg-indigo-800 text-white px-3 py-2 rounded-md"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
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

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/70">
              <div className="bg-white p-6 rounded-md w-100 relative">
                <button
                  className="absolute top-2 right-3 text-2xl"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  X
                </button>

                <h1 className="flex items-center justify-center text-2xl font-bold mb-3">Create New Project</h1>
                <form action="" className="w-full flex flex-col justify-center mx-auto my-auto">
                  <label htmlFor="">Project Name :</label>
                  <input
                    type="text"
                    placeholder="Enter the Project name here"
                    className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                  />

                  <label htmlFor="">Description :</label>
                  <textarea name="description" id="" className="border border-neutral-400 rounded-md px-3 py-1 m-1 ">
                    Describe Your Project
                  </textarea>

                  <div className="w-ful flex gap-11 mb-4">
                    <div className="  ">
                      <label htmlFor="" className="flex items-center">Status :</label>
                      <select
                        name=""
                        id=""
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                      >
                        <option value="">select Status</option>
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>

                    <div className=" ">
                      <label htmlFor="" className="flex items-center">Prioroty :</label>
                      <select
                        name=""
                        id=""
                        value={status}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                        className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                      >
                        <option value="">Priority</option>
                        <option value="todo">High</option>
                        <option value="inprogress">Medium</option>
                        <option value="done">Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-ful flex justify-between">
                    <div>
                      <label htmlFor="">Start Date :</label>
                      <input type="date" className="border border-neutral-400 rounded-md px-3 py-1 m-1"/>
                    </div>

                    <div>
                      <label htmlFor="">End Date :</label>
                      <input type="date" className="border border-neutral-400 rounded-md px-3 py-1 m-1"/>
                    </div>
                  </div>

                  <div className="w-full">
                    <button className="w-30 flex justify-center my-4 border mx-auto rounded-md bg-blue-700 text-white  hover:bg-blue-400 ">Save</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
