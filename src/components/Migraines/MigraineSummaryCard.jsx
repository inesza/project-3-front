import React from "react";
import { Link } from "react-router-dom";
import { getDuration } from "../../helpers";

const MigraineSummaryCard = ({ migraine }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //   Display day as human readable format (in english)
  const day = new Date(migraine.start_date).toLocaleDateString(options);

  //  Helper function to add 0 before minutes if there is only one digit
  //   const computeTwoDigitNumber = (value) => {
  //     return `0${value}`.slice(-2);
  //   };

  //   Calculate duration of crisis in hours and minutes
  //   const getDuration = (start, end) => {
  //     {
  //       const startDateTimestamp = new Date(start).getTime();
  //       const endDateTimestamp = new Date(end).getTime();
  //       const diff = endDateTimestamp - startDateTimestamp;
  //       const hours = Math.floor(diff / 60 / 60 / 1000);
  //       const minutes = Math.floor(diff / 60 / 1000) - hours * 60;
  //       return `${hours} hours ${computeTwoDigitNumber(minutes)} minutes `;
  //     }
  //   };
  getDuration(migraine.start_date, migraine.end_date);

  const duration = getDuration(migraine.start_date, migraine.end_date);
  return (
    <article>
      <h3>{day}</h3>
      <p>Intensity: {migraine.intensity}/10</p>
      <p>Duration: {duration}</p>
      <p>
        <Link to={`/migraines/${migraine._id}`}>View details</Link>
      </p>
    </article>
  );
};

export default MigraineSummaryCard;
