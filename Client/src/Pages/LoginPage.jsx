import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { login } from "../API/endpoint";

const LoginPage = () => {
  const Navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChage = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({ ...prev, [name]: value }));
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
        alert("Entry Successful");
        Navigate("/dashboard");
      } 
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred during Login");
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center mx-auto h-screen ">
          <form
            className="flex flex-col border border-neutral-400 px-10 py-8 rounded-md"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center font-bold text-2xl pb-4">Login Form </h1>

            <label htmlFor="">Email :</label>
            <input
              type="email"
              onChange={handleChage}
              value={loginData.email}
              placeholder="Enter Email here..."
              name="email"
              className="border border-neutral-400 px-3 rounded-md "
            />

            <label htmlFor="">Password :</label>
            <input
              type="password"
              name="password"
              onChange={handleChage}
              value={loginData.password}
              placeholder="Enter Password here..."
              className="border border-neutral-400 px-3 rounded-md "
            />

            <button
              type="submit"
              className="bg-blue-400
            text-white my-3 rounded-md hover:bg-blue-700"
            >
              Login
            </button>

            <p>
              Don't have account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:text-blue-800"
                onClick={() => {
                  Navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
