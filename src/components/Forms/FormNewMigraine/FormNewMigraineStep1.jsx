import React from "react";
import { motion } from "framer-motion";
// import useCheckbox from "../hooks/useCheckbox";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import service from "./../api/apiHandler";
import { getIntensityDescription } from "../../../helpers";
import DateInputStart from "../../DateInput/DateInputStart";
import DateInputEnd from "../../DateInput/DateInputEnd";
import IntensityInput from "../../IntensityInput/IntensityInput";
import PhasesCheckbox from "../../PhasesCheckbox/PhasesCheckbox";

const FormNewMigraineStep1 = ({
  page,
  setPage,
  formData,
  setFormData,
  handleFormData,
  x,
  setX,
  startDate,
  setStartDate,
  intensity,
  intensityDetails,
  setIntensityDetails,
  checkboxData,
  setCheckboxData,
  handleTrack,
}) => {
  // const [intensityDetails, setIntensityDetails] = useState(0);

  // Handling the "phases" checkboxes values for the form
  // const [checkboxData, setCheckboxData] = useState([
  //   {
  //     value: "Prodrome",
  //     status: false,
  //     img: "/images/formImages/prodrome.svg",
  //   },
  //   {
  //     value: "Postdrome",
  //     status: false,
  //     img: "/images/formImages/postdrome.svg",
  //   },
  //   {
  //     value: "Aura",
  //     status: false,
  //     img: "/images/formImages/aura.svg",
  //   },

  //   {
  //     value: "Headache",
  //     status: false,
  //     img: "/images/formImages/headache.svg",
  //   },
  //   {
  //     value: "Other/Unsure",
  //     status: false,
  //     img: "/images/formImages/other.svg",
  //   },
  // ]);

  const { title, description, icon } =
    getIntensityDescription(intensityDetails);
  useEffect(() => {
    setIntensityDetails(intensity);
  }, [intensity]);

  const handleDate = (event) => {
    if (event.target.name === "start-date") {
      setStartDate(startDate);
      setFormData({ ...formData, start_date: event.target.value });
    } else if (event.target.name === "end-date") {
      setFormData({ ...formData, end_date: event.target.value });
    }
  };

  return (
    <motion.div
      initial={{ x: x }}
      transition={{ delay: 0, duration: 1 }}
      animate={{ x: 0 }}
      className="form-sign-up-div"
    >
      <DateInputStart
        name="start-date"
        id="start-date"
        value={formData.start_date}
        handleDate={handleDate}
      />

      <DateInputEnd
        name="end-date"
        id="end-date"
        value={formData.end_date}
        min={formData.start_date}
        handleDate={handleDate}
      />

      {/* <section className="migraine-over-selector">
            <h3 className="w-100">Is it over yet?</h3>
            <span
              className="btn btn-select"
              style={{ background: bgColorTrue, transition: ".5s" }}
              onClick={() => handleFinishState(true)}
            >
              Yes
            </span>
            <span
              className="btn btn-select"
              style={{ background: bgColorFalse, transition: ".5s" }}
              onClick={() => handleFinishState(false)}
            >
              No
            </span>

            {finished && (
              <DateInput
                name="end-date"
                id="end-date"
                value={end_date}
                min={start_date}
                handleDate={handleDate}
              />
            )}
          </section> */}

      <IntensityInput
        name="intensity"
        min="0"
        max="10"
        value={intensity}
        intensity={intensity}
        title={title}
        description={description}
        icon={icon}
        handleFormData={handleFormData}
      />

      <PhasesCheckbox
        checkboxData={checkboxData}
        setCheckboxData={setCheckboxData}
        handleTrack={handleTrack}
      />

      <div className="form-nav" style={{ textAlign: "right" }}>
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

export default FormNewMigraineStep1;
