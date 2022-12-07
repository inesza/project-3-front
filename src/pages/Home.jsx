import React from "react";
import useAuth from "../auth/useAuth";
import { Navigate } from "react-router-dom";
import "./../styles/Home.css";

const Home = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/profile" />;
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
