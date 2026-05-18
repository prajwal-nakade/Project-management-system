import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useParams } from "react-router-dom";

import "react-big-calendar/lib/css/react-big-calendar.css";
import Layout from "../components/Layout";

const localizer = momentLocalizer(moment);

const ProjectCalendar = () => {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${projectId}/calendar`,
      );

      const { project, tasks } = res.data;

      setProject(project);

      const calendarEvents = [];

      calendarEvents.push({
        title: `${project.projectname} Started`,
        start: new Date(project.startdate),
        end: new Date(project.startdate),
      });

      calendarEvents.push({
        title: `${project.projectname} Deadline`,
        start: new Date(project.enddate),
        end: new Date(project.enddate),
      });

      tasks.forEach((task) => {
        calendarEvents.push({
          title: task.taskname,
          start: new Date(task.duedate),
          end: new Date(task.duedate),
        });
      });

      setEvents(calendarEvents);
    } catch (error) {
      console.log(error);
    }
  };

  if (!project) return <h2>Loading...</h2>;

  const start = new Date(project.startdate);
  const end = new Date(project.enddate);

  const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const remainingDays = Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Project Calendar</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white shadow rounded p-5">
            <h3>Total Project Days</h3>
            <h1 className="text-3xl font-bold">{totalDays}</h1>
          </div>

          <div className="bg-white shadow rounded p-5">
            <h3>Remaining Days</h3>
            <h1 className="text-3xl font-bold">{remainingDays}</h1>
          </div>

          <div className="bg-white shadow rounded p-5">
            <h3>Project Deadline</h3>
            <h1 className="text-xl font-bold">
              {moment(project.enddate).format("DD MMM YYYY")}
            </h1>
          </div>
        </div>

        <div className="bg-white rounded shadow p-5">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProjectCalendar;
