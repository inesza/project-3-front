import React, { useEffect, useState } from "react";
import service from "../api/ApiHandler";
import MigraineSummaryCard from "../components/Migraines/MigraineSummaryCard";

const MigraineJournalFull = () => {
  const [migraines, setMigraines] = useState([]);

  useEffect(() => {
    service.getAllMigraines().then((data) => {
      setMigraines(data);
    });
  }, []);

  if (!migraines.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      MigraineJournalFull
      {migraines.map((migraine) => {
        return <MigraineSummaryCard migraine={migraine} key={migraine._id} />;
      })}
    </div>
  );
};

export default MigraineJournalFull;
