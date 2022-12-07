import React from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import "./../styles/Home.css";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  if (isLoggedIn) navigate("/profile");
  return (
    <div>
      <h1>Migraine Journal</h1>
      <div className="mockup">
        <div className="encoche"></div>
      </div>
    </div>
  );
};

export default Home;
