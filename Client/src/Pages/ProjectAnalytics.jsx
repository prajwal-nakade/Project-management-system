import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const ProjectAnalytics = () => {
  const { projectId } = useParams();

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/projects/${projectId}/analytics`,
      );

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!analytics) return <h2>Loading...</h2>;

  const pieData = analytics.statusData.map((item) => ({
    name: item.status,
    value: Number(item.count),
  }));

  return (
    <>
      <Layout>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Project Analytics</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white shadow rounded p-5">
              <h3>Total Tasks</h3>
              <h1 className="text-3xl font-bold">{analytics.totalTasks}</h1>
            </div>

            <div className="bg-white shadow rounded p-5">
              <h3>Completed Tasks</h3>
              <h1 className="text-3xl font-bold">{analytics.completedTasks}</h1>
            </div>

            <div className="bg-white shadow rounded p-5">
              <h3>Completion Rate</h3>
              <h1 className="text-3xl font-bold">
                {analytics.completionRate}%
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white shadow rounded p-5 h-[400px]">
              <h2 className="text-xl font-bold mb-4">
                Task Status Distribution
              </h2>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={120} label>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white shadow rounded p-5 h-[400px]">
              <h2 className="text-xl font-bold mb-4">Priority Distribution</h2>

              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.priorityData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="priority" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProjectAnalytics;
