import React from "react";
import Statistics from "../components/Stats/Statistics";
import "../styles/Profile.css";

const AllStats = () => {
  return (
    <section className="stats-page">
      <Statistics full={true} />
    </section>
  );
};

export default AllStats;
