import React from "react";
import { styles } from "../styles";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.center} flex-col`}>
      <h2>Home</h2>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Home;
