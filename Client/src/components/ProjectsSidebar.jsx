import {
  ArrowRight,
  ChevronDown,
  KanbanIcon,
  ChartColumnIcon,
  CalendarIcon,
  SettingsIcon,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProjectsSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSub, setIsOpenSub] = useState(false);
  const [isOpenSub2, setIsOpenSub2] = useState(false);
  const [isSelected, setIsSelected] = useState();
  const dropDownRef = useRef();
  const navigate = useNavigate();

  const Projects = [
    { name: "LaunchPad CRM", id: 1 },
    { name: "Brand Identity Overhaul", id: 2 },
  ];

  const subMenus = [
    {
      name: "Task",
      icon: <KanbanIcon size={18} />,
    },
    {
      name: "Analytics",
      icon: <ChartColumnIcon size={18} />,
    },
    {
      name: "Calender",
      icon: <CalendarIcon size={18} />,
    },
    {
      name: "Settings",
      icon: <SettingsIcon size={18} />,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div>
        <div className="w-full flex flex-col px-5 my-8">
          <h1 className="flex justify-between">
            PROJECTS <ArrowRight size={18} />
          </h1>
          <div className="flex flex-col py-3 justify-between">
            {Projects.map((e) => (
              <div key={e.id}>
                <button
                  onClick={() => { e.id === 1 && setIsOpenSub(!isOpenSub) 
                    e.id === 2 && setIsOpenSub2(!isOpenSub2)}}
                >
                  <span className="flex items-center gap-2">
                    {e.name} <ChevronDown />
                  </span>
                </button>

                {((e.id === 1 && isOpenSub) || (e.id === 2 && isOpenSub2)) &&
                  subMenus.map((sm, iid) => (
                    <span
                      key={iid}
                      className="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 hover:bg-neutral-300 rounded-md"
                    >
                      {sm.icon}
                      {sm.name}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsSidebar;
