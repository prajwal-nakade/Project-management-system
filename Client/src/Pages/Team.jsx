import React, { useState } from "react";
import Layout from "../components/Layout";
import { UserPlus , FolderOpen, Activity, Shield, Search} from "lucide-react";

const Team = () => {



  const [isModalOpen , setIsModalOpen] = useState(false);

  return (
    <>
      <Layout>
        <div className="flex flex-col w-6xl mx-auto">
          <div className="flex justify-between mx-5 my-5 items-center">
            <div>
            <h1 className="text-2xl font-bold">Team</h1>
            <p>Manage team members and their contributions</p>
          </div>
          <div>
            <button className=" flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md " onClick={(e) => {setIsModalOpen(true)}}>
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

         {isModalOpen && (

          <div className="fixed inset-0 flex items-center justify-center bg-black/70">
            <div className="relative w-100 bg-white flex flex-col px-4 py-3 rounded-md ">
              
              <button className="absolute top-2 right-3" onClick={(e) => {setIsModalOpen(false)}}>X</button>
              <h1 className="flex font-bold text-2xl justify-center items-center gap-3 m-4"><UserPlus size={18} />Invite Team Member</h1>
              <form action="" className="flex flex-col m-6">
                <label htmlFor="">Email Address :</label>
                <input type="email" placeholder="Enter Email Address" className="border border-neutral-400 rounded-md px-3 py-1 m-1"/>


                <label htmlFor="">Role :</label>
                <select name="" id="" className="border border-neutral-400 rounded-md px-3 py-1 m-1">
                  <option value="">Member</option>
                  <option value="">Admin</option>
                </select>


                <div className="w-full flex ">

                  <button className="flex items-center justify-center mx-auto my-5 border border-neutral-400 bg-neutral-700 hover:bg-neutral-400 text-white rounded-md  w-30" onClick={(e) => {setIsModalOpen(false)}}>Cancel</button>

                  <button className="flex items-center justify-center mx-auto my-5 border border-neutral-400 bg-blue-700 hover:bg-blue-400 text-white rounded-md  w-30">Send Invite</button>
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

export default Team;
