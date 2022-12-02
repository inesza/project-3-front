import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import service from "../api/ApiHandler";
import MigraineSummaryCard from "../components/Migraines/MigraineSummaryCard";
import "../styles/Profile.css";

const Profile = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();
  const [migraines, setMigraines] = useState([]);
  const lastMigraines = migraines.slice(0, 2);
  useEffect(() => {
    service.getAllMigraines().then((data) => {
      setMigraines(data);
    });
  }, []);
  if (!migraines.length) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <section className="profile dark-bg-orange-shadow ">
      <div className="edit-profile">
        <Link to="/profile/edit" className="btn btn-orange">
          Edit my profile
        </Link>
      </div>
      <h1>Hello {currentUser.username}!</h1>
      <section className="migraine-journal">
        Migraine journal
        {lastMigraines.map((migraine) => {
          return <MigraineSummaryCard migraine={migraine} key={migraine._id} />;
        })}
        <Link to="/migraines">Older entries</Link>
      </section>
      <section className="stats">Stats</section>
    </section>
  );
};

export default Profile;
