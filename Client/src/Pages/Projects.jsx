import React, { useState } from "react";
import Layout from "../components/Layout";
import { ChevronDown, Key, SearchIcon } from "lucide-react";

const Projects = () => {
  const [open, setOpen] = useState();
  const [isOpen, setIsOpen] = useState();
  const [isSelected, setIsSelected] = useState("All Status");
  const [selected, setSelected] = useState("Priority");

  const Status = [
    {
      name: "All Status",
      id: 1,
    },
    {
      name: "Active",
      id: 2,
    },
    {
      name: "Planning",
      id: 2,
    },
    {
      name: "Completed",
      id: 3,
    },
    {
      name: "On Hold",
      id: 4,
    },
    {
      name: "Cancelled",
      id: 5,
    },
  ];

  const Priority = [
    { name: "All Priority", id: 1 },
    { name: "High", id: 2 },
    { name: "Medium", id: 3 },
    { name: "Low", id: 4 },
  ];

  return (
    <>
      <Layout>
        <div className="max-w-6xl flex flex-col mx-auto my-auto">
          <div className="flex justify-between items-center mx-5 my-5 ">
            <div>
              <h1 className="font-bold text-2xl">Projects</h1>
              <p>Manage And Track Your Projects</p>
            </div>
            <button className="bg-blue-500 px-3 py-1 rounded-md text-white  ">
              + New Project
            </button>
          </div>

          <div className="flex items-start mt-3 mx-5 my-5 gap-5">
            <div className="relative flex items-center  ">
              <SearchIcon
                size={20}
                className="absolute left-2.5 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search Projects,tasks here"
                className="rounded-md border border-gray-300 text-gray-900 pl-8 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus-border-blue-500 transition"
              />
            </div>

            <div className="">
              <div className="border w-40 px-2 py-2 rounded-md border-neutral-300 cursor-pointer ">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex cursor-pointer justify-center items-center mx-auto "
                >
                  {isSelected} <ChevronDown />
                </button>
                {open && (
                  <div className="flex flex-col justify-center items-center mx-auto border-t border-neutral-300">
                    {Status.map((e) => {
                      return (
                        <div
                          key={e.name}
                          onClick={() => {
                            setOpen(!open);
                            setIsSelected(e.name);
                          }}
                        >
                          <span>{e.name}</span>
                          {isSelected === e.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="">
              <div className="border w-40 px-2 py-2 rounded-md border-neutral-300 cursor-pointer ">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex cursor-pointer justify-center items-center mx-auto "
                >
                  {selected} <ChevronDown />
                </button>
                {isOpen && (
                  <div className="flex flex-col justify-center items-center mx-auto border-t border-neutral-300">
                    {Priority.map((s) => {
                      return (
                        <div
                          key={s.name}
                          onClick={() => {
                            setIsOpen(!isOpen);
                            setSelected(s.name);
                          }}
                        >
                          <span>{s.name}</span>
                          {selected === s.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-80 p-3 mx-5 cursor-pointer hover:bg-gray-100 border border-neutral-300 rounded-md ">
            <div className="flex justify-between">
              <h1>Kubernetes Migration</h1>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
              ipsam!
            </p>

            <div className="flex justify-between text-sm text-neutral-600 py-3">
              <span className="text-green-950 bg-green-300 text-sm px-2 py-1 rounded-md ">
                Active
              </span>
              <span>High Priority</span>
            </div>
          </div>


          <div className="w-80 p-3 mx-5 cursor-pointer hover:bg-gray-100 border border-neutral-300 rounded-md ">
            <div className="flex justify-between">
              <h1>Kubernetes Migration</h1>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro,
              ipsam!
            </p>

            <div className="flex justify-between text-sm text-neutral-600 py-3">
              <span className="text-green-950 bg-green-300 text-sm px-2 py-1 rounded-md ">
                Active
              </span>
              <span>Medium Priority</span>
            </div>
          </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Projects;
