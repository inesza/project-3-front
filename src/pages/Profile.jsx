import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import "../styles/Profile.css";
// import IntensityGraph from "../components/Stats/IntensityGraph";

import MigraineJournalBlock from "../components/Migraines/MigraineJournalBlock";
import Statistics from "../components/Stats/Statistics";

const Profile = () => {
  const { isLoggedIn, currentUser, removeUser } = useAuth();

  return (
    <section className="profile">
      <section className="profile-top" style={{ width: "100%" }}>
        <div className="edit-profile">
          <Link to="/profile/edit" className="btn btn-orange">
            Edit my profile
          </Link>
        </div>
        <h1>Hello {currentUser.username}!</h1>
      </section>

      <MigraineJournalBlock full={false} />
      <Statistics full={false} />
    </section>
  );
};

export default Profile;
