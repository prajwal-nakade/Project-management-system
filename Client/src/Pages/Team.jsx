import React from "react";
import Layout from "../components/Layout";
import { UserPlus , FolderOpen, Activity, Shield, Search} from "lucide-react";

const Team = () => {
  return (
    <>
      <Layout>
        <div>
          <div className="flex justify-between mx-5 my-5 items-center">
            <div>
            <h1 className="text-2xl font-bold">Team</h1>
            <p>Manage team members and their contributions</p>
          </div>
          <div>
            <button className=" flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md ">
                <UserPlus size={18}/>
                Invite Member</button>
          </div>
          </div>


         <div className="flex gap-5 mx-5 my-5 w-full">
             <div className="flex flex-col justify-between border border-neutral-300 shadow  px-3 py-3 gap-5 rounded-md">
              <div className="flex justify-between gap-5">
                <h1 className="text-xl">Total Projects</h1>
                <FolderOpen
                  className="text-blue-600 bg-blue-100 px-2 py-2 rounded-md"
                  size={40}
                />
              </div>
              
            </div>
            <div className="flex flex-col justify-between border border-neutral-300 shadow  px-3 py-3 gap-5 rounded-md ">
              <div className="flex justify-between gap-5">
                <h1 className="text-xl">Active Projects</h1>
                <Activity 
                  className="text-green-600 bg-green-100 px-2 py-2 rounded-md"
                  size={40}
                />
              </div>
              
            </div>
            <div className="flex flex-col justify-between border border-neutral-300 shadow  px-3 py-3 gap-5 rounded-md">
              <div className="flex justify-between gap-5">
                <h1 className="text-xl">Total Tasks</h1>
                <Shield
                  className="text-purple-600 bg-purple-100 px-2 py-2 rounded-md"
                  size={40}
                />
              </div>
              
            </div>
         </div>

         <div className="flex mx-5 my-5 relative">
            <Search size={16} className="absolute  left-1 top-2 mx-1 text-neutral-400"/>
            <input type="text "  placeholder="Search Team Members" className="border border-neutral-400 rounded px-8 py-1    "/>
         </div>
        </div>
      </Layout>
    </>
  );
};

export default Team;
