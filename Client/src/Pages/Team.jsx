import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

import {
  Search,
  Mail,
  Trash2,
  Users,
} from "lucide-react";

const Team = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] =
    useState("");

  // FETCH TEAM MEMBERS
  const fetchMembers = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/team",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMembers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // DELETE MEMBER
  const handleDelete = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/team/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMembers((prev) =>
        prev.filter(
          (member) => member.id !== id,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH FILTER
  const filteredMembers =
    members.filter((member) =>
      member.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase(),
        ),
    );

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-neutral-800">
              Team Members
            </h1>

            <p className="text-neutral-500 mt-1">
              Manage your project team
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg w-fit">
            <Users size={18} />

            <span className="font-medium">
              {members.length} Members
            </span>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="relative mb-8">

          <Search
            size={18}
            className="absolute left-3 top-3.5 text-neutral-400"
          />

          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value,
              )
            }
            className="w-full border border-neutral-300 rounded-lg px-10 py-3 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* MEMBERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredMembers.length === 0 ? (
            <div className="text-gray-500 text-lg">
              No Team Members Found
            </div>
          ) : (
            filteredMembers.map(
              (member) => (
                <div
                  key={member.id}
                  className="border border-neutral-300 rounded-xl shadow-sm bg-white p-5 hover:shadow-md transition duration-300"
                >

                  {/* TOP */}
                  <div className="flex justify-between items-start">

                    <div className="flex gap-4">

                      {/* AVATAR */}
                      <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
                        {member.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      {/* INFO */}
                      <div>
                        <h2 className="font-bold text-lg capitalize text-neutral-800">
                          {member.name}
                        </h2>

                        <div className="flex items-center gap-2 text-neutral-500 text-sm mt-1 break-all">

                          <Mail size={14} />

                          <span>
                            {member.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        handleDelete(
                          member.id,
                        )
                      }
                      className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-md transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* EXTRA INFO */}
                  <div className="mt-5 border-t pt-4">

                    <div className="flex items-center justify-between text-sm">

                      <span className="text-neutral-500">
                        Role
                      </span>

                      <span className="font-medium text-neutral-700 capitalize">
                        {member.role ||
                          "Member"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm mt-2">

                      <span className="text-neutral-500">
                        Status
                      </span>

                      <span className="text-green-600 font-medium">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              ),
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Team;