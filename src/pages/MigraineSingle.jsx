import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import service from "../api/ApiHandler";
import {
  getDuration,
  getIntensityDescription,
  getHumanReadableDate,
} from "../helpers";
import ModalConfirmDelete from "../components/ModalConfirmDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faChevronLeft,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
} from "@fortawesome/free-regular-svg-icons";

import useModal from "../hooks/useModal";
import "../styles/MigraineSingle.css";

const MigraineSingle = () => {
  const [migraine, setMigraine] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isShowing, toggleModal } = useModal();

  const [intensityIcon, setIntensityIcon] = useState(null);

  const smileIcon = (
    <FontAwesomeIcon
      icon={faFaceSmile}
      style={{ background: "var(--mint-green)" }}
    />
  );
  const mehIcon = (
    <FontAwesomeIcon icon={faFaceMeh} style={{ background: "#D7BE95" }} />
  );
  const frownIcon = (
    <FontAwesomeIcon
      icon={faFaceFrown}
      style={{ background: "var(--orange)" }}
    />
  );

  useEffect(() => {
    service
      .get(`/api/migraines/${id}`)
      .then((response) => {
        setMigraine(response.data);
      })
      .catch((e) => {
        console.error(e.message);
      });

    if (migraine && migraine.intensity <= 3) {
      setIntensityIcon(smileIcon);
    } else if (migraine && migraine.intensity > 3 && migraine.intensity <= 7) {
      setIntensityIcon(mehIcon);
    } else if (migraine && migraine.intensity > 7) {
      setIntensityIcon(frownIcon);
    }
  }, []);

  if (!migraine) return <div className="loading">Loading...</div>;
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
        console.error(e.message);
      });
  };

  let endDate = getHumanReadableDate(migraine.end_date, "hours");
  if (!migraine.end_date) endDate = "Ongoing";

  return (
    <section className="migraine-single" style={{ margin: "1em" }}>
      <Link to="/profile">
        <FontAwesomeIcon icon={faChevronLeft} />
        <span style={{ textTransform: "uppercase", marginLeft: ".5em" }}>
          Back to profile
        </span>
      </Link>
      <div className="buttons">
        <Link
          to={`/migraines/edit/${migraine._id}`}
          className="btn-edit-migraine"
        >
          <FontAwesomeIcon icon={faPen} />
        </Link>
        <button onClick={toggleModal} className="btn-delete-migraine">
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
      <h2>Migraine summary</h2>
      <section className="dark-bg-grey-shadow dates-info">
        <div className="dates">
          <div className="start">
            {getHumanReadableDate(migraine.start_date, "hours")}
          </div>
          <div>
            <FontAwesomeIcon icon={faArrowDown} style={{ fontSize: "2em" }} />
          </div>
          <div className="end">{endDate}</div>
        </div>
        <div className="duration">
          <div>Duration</div>
          <p className="time">
            {getDuration(migraine.start_date, migraine.end_date, "short")}
          </p>
        </div>
      </section>

      <section className="intensity dark-bg-grey-shadow">
        <div className="intensity-label">
          <h3>Intensity</h3>
          <p>
            {migraine.intensity && migraine.intensity}/10 -{" "}
            {intensityDetails.title}
          </p>
        </div>
        <div className="intensity-icon">{intensityIcon}</div>
      </section>

      <section className="phases dark-bg-grey-shadow">
        <h3>Symptoms</h3>
        {migraine.phases?.map((phase) => phase)}
      </section>
      <div className="dark-bg-grey-shadow">
        <h3>Trackers</h3>
        {migraine.selected_trackers?.map((tracker) => tracker.name)}
        {!migraine.selected_trackers.length &&
          "No tracker registered for this entry"}
      </div>
      {/* <div className="dark-bg-grey-shadow">
        Treatments: {migraine.treatments?.map((treatment) => treatment)}
      </div> */}
      <div className="dark-bg-grey-shadow">
        <h3>Notes</h3>
        {migraine.notes && migraine.notes}
      </div>
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
