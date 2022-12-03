import React from "react";
import { Link, Outlet } from "react-router-dom";

const NewMigraineButton = () => {
  return (
    <>
      <Outlet />
      <Link to="/migraines/create" className="profile-new-migraine-button">
        New Migraine entry
      </Link>
    </>
  );
};

export default NewMigraineButton;
