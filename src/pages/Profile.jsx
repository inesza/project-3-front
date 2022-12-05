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
      console.log(data);
      setMigraines(data);
    });
  }, []);

  return (
    <section className="profile">
      <div>
        <div className="edit-profile">
          <Link to="/profile/edit" className="btn btn-orange">
            Edit my profile
          </Link>
        </div>
        <h1>Hello {currentUser.username}!</h1>
        <section className="migraine-journal dark-bg-orange-shadow">
          <h2>Migraine journal</h2>
          {migraines.length !== 0 &&
            lastMigraines.map((migraine) => {
              return (
                <>
                  <MigraineSummaryCard migraine={migraine} key={migraine._id} />
                </>
              );
            })}
          <Link to="/migraines">Older entries</Link>
          {migraines.length === 0 && (
            <div className="empty-journal">
              <span>No Migraines to show</span>
              <Link
                to="/migraines/create"
                className="btn btn-orange-shadow-mint"
              >
                Start tracking now
              </Link>
            </div>
          )}
        </section>
        <section className="stats dark-bg-orange-shadow">Stats</section>
      </div>
    </section>
  );
};

export default Profile;
