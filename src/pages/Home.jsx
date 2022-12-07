import React from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  if (isLoggedIn) navigate("/profile");
  return (
    <div>
      <h1>Welcome 🏡</h1>
    </div>
  );
};

export default Home;
