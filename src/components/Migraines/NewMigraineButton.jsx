import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewMigraineButton = () => {
  return (
    <>
      <Outlet />
      <Link to="/migraines/create" className="profile-new-migraine-button">
        <span style={{ marginRight: "1em" }}>New Migraine entry</span>
        <FontAwesomeIcon icon={faPlus} />
      </Link>
    </>
  );
};

export default NewMigraineButton;
