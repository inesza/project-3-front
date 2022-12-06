import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import service from "../api/ApiHandler";
import { getDuration, getIntensityDescription } from "../helpers";
import ModalConfirmDelete from "../components/ModalConfirmDelete";
import useModal from "../hooks/useModal";

const MigraineSingle = () => {
  const [migraine, setMigraine] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isShowing, toggleModal } = useModal();

  useEffect(() => {
    service
      .get(`/api/migraines/${id}`)
      .then((response) => {
        console.log(response.data);
        setMigraine(response.data);
      })
      .catch((e) => {
        console.log(e);
        setErrorMessage(e.response.data.errorMessage);
      });
  }, []);

  if (!migraine)
    return (
      <div className="loading">
        {errorMessage && (
          <div>
            <p>{errorMessage}</p>
            <button>
              <Link to={"/profile"}>Profile</Link>
            </button>
          </div>
        )}
        {!errorMessage && <p className="errorMessage">Loading...</p>}
      </div>
    );
  const intensityDetails = getIntensityDescription(migraine.intensity);

  const handleDelete = () => {
    service
      .delete(`/api/migraines/${id}`)
      .then(
        (document.querySelector(".modal-header h3").textContent =
          "Migraine entry deleted")
      )
      .then(
        setTimeout(() => {
          navigate("/profile");
        }, 1000)
      )
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <section>
      <div className="buttons">
        <button>
          <Link to={`/migraines/edit/${migraine._id}`}>Edit</Link>
        </button>
        <button onClick={toggleModal}>Delete</button>
      </div>
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
      <ModalConfirmDelete
        isShowing={isShowing}
        hide={toggleModal}
        handleDelete={handleDelete}
        modalTitle={"Delete migraine entry"}
      />
    </section>
  );
};

export default MigraineSingle;
