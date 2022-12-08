import React from "react";
import { motion } from "framer-motion";
import TrackersCheckbox from "../../TrackersCheckbox/TrackersCheckbox";

const FormNewMigraineStep2 = ({
  page,
  setPage,
  x,
  setX,
  handleTrack,
  trackersCategory,
  trackersSubCategory,
  trackers,
  setTrackersCategory,
  setTrackersSubCategory,
  setTrackers,
}) => {
  return (
    <motion.div
      initial={{ x: x }}
      transition={{ delay: 0, duration: 1 }}
      animate={{ x: 0 }}
      className="form-sign-up-div"
    >
      <TrackersCheckbox
        trackersCategory={trackersCategory}
        trackersSubCategory={trackersSubCategory}
        trackers={trackers}
        handleTrack={handleTrack}
        setTrackersCategory={setTrackersCategory}
        setTrackersSubCategory={setTrackersSubCategory}
        setTrackers={setTrackers}
      />
      <div
        className="form-nav"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <button
          onClick={() => {
            setPage(page - 1);
            setX(-1000);
          }}
          className="btn-grey-shadow-light-grey "
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
            setX(1000);
          }}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default FormNewMigraineStep2;
