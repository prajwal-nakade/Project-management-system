import { ArrowRight, Calendar, UserIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectOverview = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/projects/projects", {
        withCredentials: true,
      });

      setProjects(res.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchProjects();
    };

    init();
  }, []);

  return (
    <>
      <div className="border w-auto m-3 flex flex-col justify-center items-center rounded-md border-neutral-300 shadow">
        {/* Header */}
        <div className="w-full flex justify-between items-center border-b border-neutral-300 px-4 py-3 pb-2 mx-auto">
          <div>
            <h2 className="font-semibold text-lg">Project Overview</h2>
          </div>

          <div>
            <button className="flex items-center gap-2 text-sm hover:text-blue-600 transition">
              View All <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* No Projects */}
        {projects.length === 0 && (
          <div className="p-6 text-gray-500">No projects found</div>
        )}

        {/* Dynamic Projects */}
        {projects.map((project) => (
          <div
            key={project.id}
            className="w-full p-3 cursor-pointer hover:bg-gray-100 border-b border-neutral-300 transition"
          >
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-lg">{project.projectname}</h1>

              <span
                className={`text-sm px-2 py-1 rounded-md capitalize
                  ${
                    project.status === "active"
                      ? "bg-green-300 text-green-950"
                      : project.status === "pending"
                        ? "bg-yellow-300 text-yellow-900"
                        : project.status === "completed"
                          ? "bg-blue-300 text-blue-950"
                          : "bg-gray-300 text-gray-900"
                  }
                `}
              >
                {project.status}
              </span>
            </div>

            <p className="text-gray-600 mt-1">{project.projectdesc}</p>

            <div className="flex gap-4 py-3 text-sm text-gray-700">
              <span className="flex items-center gap-2">
                <UserIcon size={16} />
                Priority: {project.priority}
              </span>

              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(project.enddate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectOverview;
