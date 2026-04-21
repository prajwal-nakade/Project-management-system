import { UserIcon } from "lucide-react";
import React from "react";

const Mytask = () => {
  return (
    <>
      <div className=" border lg:w-65 md:w-65 sm:w-60 m-3 flex flex-col items-center rounded-md border-neutral-300 shadow">
        <div className="w-full  border-b border-neutral-300 px-4 py-3  pb-2">
          <div>
            <h2 className="flex items-center gap-3">
              {" "}
              <UserIcon size={16} />
              My Task
            </h2>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 p-3 text-sm">
          <div className=" hover:bg-gray-100 rounded-md p-3">
            <span className="font-medium">Set Up EKS Cluster</span>
            <p className="font-light">TASK • HIGH priority</p>
          </div>

          <div className=" hover:bg-gray-100 rounded-md p-3">
            <span className="font-medium">Migrate to Playwright 1.48</span>
            <p className="font-light">IMPROVEMENT • HIGH priority</p>
          </div>

          <div className=" hover:bg-gray-100 rounded-md p-3">
            <span className="font-medium">Visual Snapshot Comparison</span>
            <p className="font-light">FEATURE • LOW priority</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mytask;
