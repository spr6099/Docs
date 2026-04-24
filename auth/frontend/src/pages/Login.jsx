import React, { useEffect, useState } from "react";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setLoading(true);
      const res = await login(formData);
      const role = res?.data?.user?.role;

      // if (role === "admin") {
      //   navigate("/admin");
      // } else if (role === "user") {
      //   navigate("/user");
      // } else {
      //   navigate("/");
      // }
    } catch (error) {
      console.error(error);
      setErrorMsg(error?.response?.data?.message || "Login failed");
      alert(error?.response?.data?.message || "Login failed");
      console.log(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "user") {
      navigate("/user");
    } 
  }, [user,navigate]);

  return (
    <div className={`${styles.center}`}>
      <div className=" w-full max-w-md ">
        <h2 className="text-center text-2xl font-semibold">Login</h2>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            name="email"
            value={formData.email}
            className={`${styles.input}`}
            onChange={handleChange}
          />
          <input
            placeholder="Passowrd"
            name="password"
            value={formData.password}
            className={`${styles.input}`}
            onChange={handleChange}
          />
          <button
            className="bg-red-500 py-2 rounded-md text-white"
            type="submit"
          >
            Login
          </button>
        </form>
        <p>
          if you are new , click to
          <button className="bg-red-200" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
