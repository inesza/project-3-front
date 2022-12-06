import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../../api/ApiHandler";
import MigraineSummaryCard from "./MigraineSummaryCard";

const MigraineJournalBlock = ({ full }) => {
  const [migraines, setMigraines] = useState([]);

  useEffect(() => {
    service.getAllMigraines().then((data) => {
      if (full) {
        setMigraines(data);
      } else {
        setMigraines(data.slice(0, 2));
      }
    });
  }, []);
  return (
    <section className="migraine-journal dark-bg-orange-shadow">
      <h2>Migraine journal</h2>
      {migraines.length !== 0 &&
        migraines.map((migraine) => {
          return <MigraineSummaryCard migraine={migraine} key={migraine._id} />;
        })}
      {!full && (
        <Link to="/migraines" className="btn btn-orange-shadow-mint">
          Older entries
        </Link>
      )}

      {migraines.length === 0 && (
        <div className="empty-journal">
          <span>No Migraines to show</span>
          <Link to="/migraines/create" className="btn btn-orange-shadow-mint">
            Start tracking now
          </Link>
        </div>
      )}
    </section>
  );
};

export default MigraineJournalBlock;
