import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../API/endpoint";

const SignUp = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const data = await signup(payload);

      if (data && data.success) {
        alert("Entry Successful");
        Navigate("/");
      } else {
        alert(data?.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred during signup");
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
            <h1 className="text-center font-bold text-2xl pb-4">
              SignUp Form{" "}
            </h1>

            <label htmlFor="">Name :</label>
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter Name here..."
              name="name"
              className="border border-neutral-400 px-3 rounded-md "
            />

            <label htmlFor="">Email :</label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter Email here..."
              name="email"
              className="border border-neutral-400 px-3 rounded-md "
            />

            <label htmlFor="">Password :</label>
            <input
              value={formData.password}
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter Password here..."
              className="border border-neutral-400 px-3 rounded-md "
            />

            <button
              type="submit"
              className="bg-blue-400
            text-white my-3 rounded-md hover:bg-blue-700"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
