import React from "react";
import { Link } from "react-router-dom";
import { getDuration, getHumanReadableDate } from "../../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faClock,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const MigraineSummaryCard = ({ migraine }) => {
  // const day = getHumanReadableDate(migraine.start_date);

  getDuration(migraine.start_date, migraine.end_date);

  const duration = getDuration(migraine.start_date, migraine.end_date);
  return (
    <article className="migraine-card">
      <Link
        to={`/migraines/${migraine._id}`}
        style={{ marginTop: 0 }}
        className="migraine-card-body"
      >
        <div className="main">
          <h3>{getHumanReadableDate(migraine.start_date)}</h3>
          <div className="nums" style={{ display: "flex", gap: "1em" }}>
            <p>
              <FontAwesomeIcon icon={faBolt} style={{ marginRight: ".5em" }} />
              {migraine.intensity}/10
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} style={{ marginRight: ".5em" }} />
              {duration}
            </p>
          </div>
        </div>

        <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "3em" }} />
      </Link>
    </article>
  );
};

export default MigraineSummaryCard;
