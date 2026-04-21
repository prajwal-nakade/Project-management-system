import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyTaskSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState();
  const dropDownRef = useRef();
  const Navigate = useNavigate();

  const Tasks = [
    {
      name: "Design Ui Dashboard",
    },
    { name: "Fix Duplicate Contact Bug" },
    { name: "Update the Git Repository" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[]);

  return (
    <>
      <div>
        <div className="w-full  flex flex-col justify-start  " ref={dropDownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between px-5 cursor-pointer"
          >
            My Tasks <ChevronDown />
          </button>
          {isOpen && (
            <div className=" w-full flex flex-col justify-start  px-5 text-gray-600">
              {Tasks.map((ts) => {
                return (
                  <div
                    key={ts.name}
                    onClick={() => {
                      setIsSelected(ts.name);
                      setIsOpen(false);
                      Navigate('/TaskDetails');
                    }}
                   className="flex py-2 hover:bg-neutral-200 rounded-md"
                  >
                     
                      <ChevronRight className="text-blue-900"/>
                      <span>{ts.name}</span>
                      {isSelected === ts.name}
                    
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyTaskSidebar;
