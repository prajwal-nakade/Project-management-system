import { ArrowRight, Calendar, UserIcon } from "lucide-react";
import React from "react";

const ProjectOverview = () => {
  return (
    <>
      <div className=" border w-auto   m-3 flex flex-col justify-center items-center rounded-md border-neutral-300 shadow">
        <div className="w-full flex justify-between items-center border-b border-neutral-300 px-4 py-3  pb-2 mx-auto ">
          <div>
            <h2>Project Overview</h2>
          </div>
          <div>
            <button className="flex items-center gap-2">view all <ArrowRight size={16}/></button>
          </div>
        </div>


        <div className="w-full p-3 cursor-pointer hover:bg-gray-100 border-b border-neutral-300">
            <div className="flex justify-between">
                <h1>Kubernetes Migration</h1>
            <span className="text-green-950 bg-green-300 text-sm px-2 py-1">Active</span> 
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ipsam!</p>

            <div className="flex gap-4 py-3">
                <span className="flex items-center gap-2"><UserIcon size={16}/> 3 members</span>
                 <span className="flex items-center gap-2"><Calendar size={16} />Jan 20 , 2026</span>
            </div>
        </div>

        <div className="w-full p-3 cursor-pointer hover:bg-gray-100 border-b border-neutral-300">
            <div className="flex justify-between">
                <h1>Kubernetes Migration</h1>
            <span className="text-green-950 bg-green-300 text-sm px-2 py-1">Active</span> 
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ipsam!</p>

            <div className="flex gap-4 py-3">
                <span className="flex items-center gap-2"><UserIcon size={16}/> 3 members</span>
                 <span className="flex items-center gap-2"><Calendar size={16} />Jan 20 , 2026</span>
            </div>
        </div><div className="w-full p-3 cursor-pointer hover:bg-gray-100 border-b border-neutral-300">
            <div className="flex justify-between">
                <h1>Kubernetes Migration</h1>
            <span className="text-green-950 bg-green-300 text-sm px-2 py-1">Active</span> 
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ipsam!</p>

            <div className="flex gap-4 py-3">
                <span className="flex items-center gap-2"><UserIcon size={16}/> 3 members</span>
                 <span className="flex items-center gap-2"><Calendar size={16} />Jan 20 , 2026</span>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProjectOverview;
