import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Clock3,
} from "lucide-react";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/tasks",
        {
          withCredentials: true,
        },
      );

      const tasks = res.data.tasks;

      // SORT LATEST FIRST
      const sortedTasks = [...tasks].sort(
        (a, b) => b.id - a.id,
      );

      // CREATE ACTIVITY DATA
      const recent = sortedTasks.map((task) => {
        let activityType = "todo";
        let activityMessage = "Task Created";

        // COMPLETED
        if (task.status === "done") {
          activityType = "done";
          activityMessage = "Task Completed";
        }

        // IN PROGRESS
        else if (task.status === "inprogress") {
          activityType = "progress";
          activityMessage = "Task In Progress";
        }

        // OVERDUE
        if (
          new Date(task.duedate) < new Date() &&
          task.status !== "done"
        ) {
          activityType = "overdue";
          activityMessage = "Task Overdue";
        }

        return {
          id: task.id,
          title: task.taskname,
          description: task.taskdesc,
          status: task.status,
          project: task.projectname,
          type: activityType,
          message: activityMessage,
          duedate: task.duedate,
        };
      });

      setActivities(recent.slice(0, 8));
    } catch (error) {
      console.error(error);
    }
  };

  // ICONS
  const getIcon = (type) => {
    switch (type) {
      case "done":
        return (
          <CheckCircle
            size={30}
            className="bg-green-100 text-green-600 rounded-md p-1"
          />
        );

      case "overdue":
        return (
          <AlertTriangle
            size={30}
            className="bg-red-100 text-red-600 rounded-md p-1"
          />
        );

      case "progress":
        return (
          <Clock3
            size={30}
            className="bg-yellow-100 text-yellow-600 rounded-md p-1"
          />
        );

      default:
        return (
          <MessageSquare
            size={30}
            className="bg-blue-100 text-blue-600 rounded-md p-1"
          />
        );
    }
  };

  // STATUS COLORS
  const getStatusStyle = (status) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-700";

      case "inprogress":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col border rounded-md border-neutral-200 bg-white shadow-sm m-3">
      {/* HEADER */}
      <div className="w-full border-b border-neutral-200 px-4 py-3">
        <h1 className="font-bold text-lg">
          Recent Activity
        </h1>
      </div>

      {/* EMPTY STATE */}
      {activities.length === 0 ? (
        <div className="p-5 text-gray-500">
          No recent activity found
        </div>
      ) : (
        <div className="flex flex-col">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex flex-col w-full px-4 py-4 border-b border-neutral-200 hover:bg-gray-50 transition"
            >
              {/* TOP */}
              <div className="flex items-start gap-3">
                {getIcon(activity.type)}

                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold capitalize">
                        {activity.title}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {activity.message}
                      </p>
                    </div>

                    <span
                      className={`text-xs px-2 py-1 rounded-md capitalize ${getStatusStyle(
                        activity.status,
                      )}`}
                    >
                      {activity.status}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-sm text-gray-600 mt-2">
                    {activity.description}
                  </p>

                  {/* FOOTER */}
                  <div className="flex justify-between mt-3 text-xs text-gray-500">
                    <span>
                      Project: {activity.project}
                    </span>

                    <span>
                      Due:{" "}
                      {new Date(
                        activity.duedate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;