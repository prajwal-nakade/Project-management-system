import { MessageSquare } from "lucide-react";
import React from "react";

const RecentActivity = () => {
  return (
    <>
      <div className="flex flex-col border rounded-md border-neutral-200 justify-center items-center m-3">
        <div className="w-full border-b border-neutral-200 px-3 py-2">
          <div>
            <h1>Recent Activity</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full px-3 py-2 border-b border-neutral-300">
          <div className="flex ">
            <MessageSquare
              size={30}
              className="bg-gray-300 rounded-md text-yellow-500 px-1 py-1"
            />
            <div className="w-full flex justify-between px-5">
              <h2 className="font-semibold">Security Audit</h2>
              <span className="bg-gray-300 px-2 py-1">TODO</span>
            </div>
          </div>
          <p className="px-12">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="flex flex-col justify-center w-full px-3 py-2 border-b border-neutral-300">
          <div className="flex ">
            <MessageSquare
              size={30}
              className="bg-gray-300 rounded-md text-yellow-500 px-1 py-1"
            />
            <div className="w-full flex justify-between px-5">
              <h2 className="font-semibold">Security Audit</h2>
              <span className="bg-gray-300 px-2 py-1">TODO</span>
            </div>
          </div>
          <p className="px-12">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="flex flex-col justify-center w-full px-3 py-2 border-b border-neutral-300">
          <div className="flex ">
            <MessageSquare
              size={30}
              className="bg-gray-300 rounded-md text-yellow-500 px-1 py-1"
            />
            <div className="w-full flex justify-between px-5">
              <h2 className="font-semibold">Security Audit</h2>
              <span className="bg-gray-300 px-2 py-1">TODO</span>
            </div>
          </div>
          <p className="px-12">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="flex flex-col justify-center w-full px-3 py-2 border-b border-neutral-300">
          <div className="flex ">
            <MessageSquare
              size={30}
              className="bg-gray-300 rounded-md text-yellow-500 px-1 py-1"
            />
            <div className="w-full flex justify-between px-5">
              <h2 className="font-semibold">Security Audit</h2>
              <span className="bg-gray-300 px-2 py-1">TODO</span>
            </div>
          </div>
          <p className="px-12">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="flex flex-col justify-center w-full px-3 py-2 border-b border-neutral-300">
          <div className="flex ">
            <MessageSquare
              size={30}
              className="bg-gray-300 rounded-md text-yellow-500 px-1 py-1"
            />
            <div className="w-full flex justify-between px-5">
              <h2 className="font-semibold">Security Audit</h2>
              <span className="bg-gray-300 px-2 py-1">TODO</span>
            </div>
          </div>
          <p className="px-12">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="flex flex-col justify-center w-full px-3 py-2 border-b border-neutral-300">
          <div className="flex ">
            <MessageSquare
              size={30}
              className="bg-gray-300 rounded-md text-yellow-500 px-1 py-1"
            />
            <div className="w-full flex justify-between px-5">
              <h2 className="font-semibold">Security Audit</h2>
              <span className="bg-gray-300 px-2 py-1">TODO</span>
            </div>
          </div>
          <p className="px-12">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </>
  );
};

export default RecentActivity;
