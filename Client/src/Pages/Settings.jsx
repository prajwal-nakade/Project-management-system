import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

import { User, Moon, Sun, LogOut, Camera, Bell, Shield } from "lucide-react";

import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const [user, setUser] = useState({
    username: "",
    email: "",
    profilepic: "",
  });

  const [loading, setLoading] = useState(false);

  // LOAD USER
  useEffect(() => {
    fetchUser();
  }, []);

  // APPLY THEME
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  // FETCH USER
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "https://project-management-system-vvva.vercel.app/auth/profile",
        {
          withCredentials: true,
        },
      );

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // UPDATE PROFILE
  const handleSave = async () => {
    try {
      setLoading(true);

      await axios.put(
        "https://project-management-system-vvva.vercel.app/auth/profile",
        {
          username: user.username,
          email: user.email,
          profilepic: user.profilepic,
        },
        {
          withCredentials: true,
        },
      );

      alert("Profile Updated");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // PROFILE IMAGE
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setUser((prev) => ({
      ...prev,
      profilepic: imageUrl,
    }));
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://project-management-system-vvva.vercel.app/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      // CLEAR STORAGE
      localStorage.clear();
      sessionStorage.clear();

      // REDIRECT
      navigate("/login");

      // OPTIONAL HARD REFRESH
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50  transition-all">
        <div className="max-w-5xl mx-auto p-6">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold ">Settings</h1>

            <p className=" mt-1">Manage your account preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT PANEL */}
            <div className="bg-white  rounded-2xl shadow p-6 h-fit">
              <div className="flex flex-col items-center">
                {/* PROFILE IMAGE */}
                <div className="relative">
                  <img
                    src={
                      user.profilepic || "https://ui-avatars.com/api/?name=User"
                    }
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
                  />

                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="absolute bottom-1 right-1 bg-blue-600 p-2 rounded-full hover:bg-blue-700"
                  >
                    <Camera size={16} />
                  </button>

                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <h2 className="mt-4 text-xl font-semibold ">
                  {user.username || "User"}
                </h2>

                <p className=" text-sm">{user.email}</p>
              </div>

              {/* LOGOUT */}
              <div className="mt-6 border-t pt-5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="lg:col-span-2 bg-white  rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6 ">
                Profile Information
              </h2>

              {/* USERNAME */}
              <div className="mb-5">
                <label className="text-sm font-medium ">Username</label>

                <div className="mt-2 flex items-center border rounded-xl px-4 py-3 dark:border-neutral-700">
                  <User size={18} className="" />

                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className="w-full outline-none px-3 bg-transparent "
                    placeholder="Enter username"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="mb-5">
                <label className="text-sm font-medium ">Email</label>

                <div className="mt-2 flex items-center border rounded-xl px-4 py-3 dark:border-neutral-700">
                  <Bell size={18} className="" />

                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full outline-none px-3 bg-transparent "
                    placeholder="Enter email"
                  />
                </div>
              </div>

              {/* SECURITY */}
              <div className="mb-6">
                <label className="text-sm font-medium ">Security</label>

                <div className="mt-2 border rounded-xl p-4 dark:border-neutral-700">
                  <div className="flex items-center gap-3">
                    <Shield className="text-green-500" />

                    <div>
                      <h3 className="font-medium ">
                        Your account is protected
                      </h3>

                      <p className="text-sm text-gray-500">
                        Authentication enabled
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
