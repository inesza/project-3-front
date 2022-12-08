import React from "react";
import useAuth from "../auth/useAuth";
import { Navigate, Link } from "react-router-dom";
import "./../styles/Home.css";

const Home = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/profile" />;
  return (
    <div>
      <div className="home-container">
        <section className="migraine-journal dark-bg-orange-shadow description-section">
          <h1>
            <img
              className="migraine-logo"
              src="/images/full-logo.svg"
              alt="Migraine Journal"
            />
          </h1>

          <div className="description">
            <h2>Take better control your migraines: </h2>
            <p>
              Keep track of your migraine triggers and adapt your life
              accordingly.
            </p>
          </div>
          <div className="start-btn">
            <Link to={"/signup"} className="btn btn-orange-shadow-mint">
              Start tracking now
            </Link>
          </div>
        </section>
        <section className="mockup-container">
          <div className="mockup">
            <div className="encoche"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
