import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../api/ApiHandler";
import { getDuration, getIntensityDescription } from "../helpers";

const MigraineSingle = () => {
  const [migraine, setMigraine] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    service
      .get(`/api/migraines/${id}`)
      .then((response) => {
        console.log(response.data);
        setMigraine(response.data);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);
  if (!migraine) return <div className="loading">Loading...</div>;
  const intensityDetails = getIntensityDescription(migraine.intensity);

  return (
    <section>
      <div>
        Start: {migraine.start_date}
        End: {migraine.end_date}
        <br />
        Duration : {getDuration(migraine.start_date, migraine.end_date)}
      </div>
      <div>
        Intensity: {migraine.intensity && migraine.intensity}/10{" "}
        {intensityDetails.title}, {intensityDetails.description}
      </div>
      <div>Phases :{migraine.phases?.map((phase) => phase)}</div>
      <div>
        Trackers: {migraine.selected_trackers?.map((tracker) => tracker.name)}
      </div>
      <div>
        Treatments: {migraine.treatments?.map((treatment) => treatment)}
      </div>
      <div>Notes: {migraine.notes && migraine.notes}</div>
    </section>
  );
};

export default MigraineSingle;
