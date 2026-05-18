import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../API/endpoint";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const Navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChage = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        email: loginData.email,
        password: loginData.password,
      };

      const data = await login(payload);

      if (data && data.success) {
        alert("Login Successful");
        Navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "An error occurred during Login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>

          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-bold leading-tight">Welcome Back</h1>

            <p className="mt-6 text-lg text-blue-100 leading-relaxed">
              Manage your projects, teams, analytics, and tasks efficiently with
              your professional project management platform.
            </p>

            <div className="mt-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center">
                <ArrowRight size={22} />
              </div>

              <span className="text-lg font-medium">
                Stay productive & organized
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-800">Login</h2>

            <p className="text-gray-500 mt-2">
              Enter your credentials to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="mt-2 relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChage}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-2 relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChage}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.01] hover:shadow-xl transition-all duration-300"
            >
              Login
            </button>

            {/* SIGNUP */}
            <p className="text-center text-gray-600">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-semibold"
                onClick={() => Navigate("/signup")}
              >
                Create Account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
