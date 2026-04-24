import React from "react";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerAPI } from "../api/auth.service";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    RPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, RPassword } = formData;
      if (!name || !email || !password || !RPassword) {
        alert("All fields are required");
        return;
      }

      if (password !== RPassword) {
        alert("password do not match");
        return;
      }

      const response = await registerAPI({ name, email, password });
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log(error?.response?.data?.message);
      alert(error?.response?.data?.message || "something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl mb-3 font-semibold">Register</h2>
        
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className={`${styles.input}`}
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className={`${styles.input}`}
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className={`${styles.input}`}
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className={`${styles.input}`}
            placeholder="Re Enter password"
            name="RPassword"
            value={formData.RPassword}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
          <p>
            already registered{" "}
            <button onClick={() => navigate("/login")}>Login</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
