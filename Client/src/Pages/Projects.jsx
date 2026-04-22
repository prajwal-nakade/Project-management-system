import React, { useState } from "react";
import Layout from "../components/Layout";
import { ChevronDown, Key, SearchIcon } from "lucide-react";

const Projects = () => {
  const [open, setOpen] = useState();
  const [isOpen, setIsOpen] = useState();
  const [isSelected, setIsSelected] = useState("All Status");
  const [selected, setSelected] = useState("Priority");

  const [ isModalOpen , setIsModalOpen] = useState(false);

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
            <button className="bg-blue-500 px-3 py-1 rounded-md text-white  " 
            onClick={(e) => {setIsModalOpen(true)}}>
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

                <h1 className="flex items-center justify-center text-2xl font-bold mb-3">
                  Create New Project
                </h1>
                <form
                  action=""
                  className="w-full flex flex-col justify-center mx-auto my-auto"
                >
                  <label htmlFor="">Project Name :</label>
                  <input
                    type="text"
                    placeholder="Enter the Project name here"
                    className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                  />

                  <label htmlFor="">Description :</label>
                  <textarea
                    name="description"
                    id=""
                    className="border border-neutral-400 rounded-md px-3 py-1 m-1 "
                  >
                    Describe Your Project
                  </textarea>

                  <div className="w-ful flex gap-11 mb-4">
                    <div className="  ">
                      <label htmlFor="" className="flex items-center">
                        Status :
                      </label>
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
                      <label htmlFor="" className="flex items-center">
                        Prioroty :
                      </label>
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
                      <input
                        type="date"
                        className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="">End Date :</label>
                      <input
                        type="date"
                        className="border border-neutral-400 rounded-md px-3 py-1 m-1"
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <button className="w-30 flex justify-center my-4 border mx-auto rounded-md bg-blue-700 text-white  hover:bg-blue-400 ">
                      Save
                    </button>
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

export default Projects;
