import React from "react";
import { useState, useEffect } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import service from "../api/apiHandler";
import { getIntensityDescription } from "../helpers";
import DateInputStart from "../components/DateInput/DateInputStart";
import DateInputEnd from "../components/DateInput/DateInputEnd";
import IntensityInput from "../components/IntensityInput/IntensityInput";
import PhasesCheckbox from "../components/PhasesCheckbox/PhasesCheckbox";
import Notes from "../components/Notes/Notes";
import TrackersCheckbox from "../components/TrackersCheckbox/TrackersCheckbox";

import FormNewMigraineStep1 from "../components/Forms/FormNewMigraine/FormNewMigraineStep1";
import FormNewMigraineStep2 from "../components/Forms/FormNewMigraine/FormNewMigraineStep2";
import FormNewMigraineStep3 from "../components/Forms/FormNewMigraine/FormNewMigraineStep3";
import FormNewMigraineStep4 from "../components/Forms/FormNewMigraine/FormNewMigraineStep4";

const NewMigraine = () => {
  const navigate = useNavigate();
  const [trackersCategory, setTrackersCategory] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [trackersSubCategory, setTrackersSubCategory] = useState([]);
  const [intensityDetails, setIntensityDetails] = useState(0);

  const rightNow = new Date().toISOString().split(".")[0].slice(0, -3);
  const [startDate, setStartDate] = useState(rightNow);

  const [x, setX] = useState(0);
  const [page, setPage] = useState(0);

  // // Handling the "phases" checkboxes values for the form
  const [checkboxData, setCheckboxData] = useState([
    {
      value: "Prodrome",
      status: false,
      img: "/images/formImages/prodrome.svg",
    },
    {
      value: "Postdrome",
      status: false,
      img: "/images/formImages/postdrome.svg",
    },
    {
      value: "Aura",
      status: false,
      img: "/images/formImages/aura.svg",
    },

    {
      value: "Headache",
      status: false,
      img: "/images/formImages/headache.svg",
    },
    {
      value: "Other/Unsure",
      status: false,
      img: "/images/formImages/other.svg",
    },
  ]);

  const [formData, setFormData] = useState({
    start_date: startDate,
    end_date: "",
    intensity: 0,
    notes: "",
  });

  //Getting all trackers, categories and subcategories to display them on form
  useEffect(() => {
    service.get("/api/trackers").then((res) => {
      setTrackersCategory(
        res.data.allTrackersCategory.map((t) => {
          return { name: t.name, status: false, _id: t._id };
        })
      );
      setTrackersSubCategory(
        res.data.allTrackersSubCategory.map((t) => {
          return {
            name: t.name,
            status: false,
            _id: t._id,
            category: t.category,
          };
        })
      );
      setTrackers(
        res.data.allTrackers.map((t) => {
          return {
            name: t.name,
            status: false,
            _id: t._id,
            subcategory: t.subcategory,
          };
        })
      );
    });
  }, []);

  const { start_date, end_date, intensity, notes } = formData;
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const phases = [];
      checkboxData.map((phase) => {
        if (phase.status) {
          phases.push(phase.value);
        }
      });
      formData["phases"] = phases;
      formData["selected_trackers"] = trackers
        .filter((tracker) => tracker.status)
        .map((tracker) => tracker._id);
      const { data } = await service.post("/api/migraines", formData);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTrack = (id, func, obj) => {
    const copy = JSON.parse(JSON.stringify(obj));
    func(
      copy.map((category) => {
        if (id === category._id || id === category.value) {
          category.status = !category.status;
        }
        return category;
      })
    );
  };

  // const { title, description, icon } =
  //   getIntensityDescription(intensityDetails);
  // useEffect(() => {
  //   setIntensityDetails(intensity);
  // }, [intensity]);

  // const handleDate = (event) => {
  //   if (event.target.name === "start-date") {
  //     setStartDate(startDate);
  //     setFormData({ ...formData, start_date: event.target.value });
  //   } else if (event.target.name === "end-date") {
  //     setFormData({ ...formData, end_date: event.target.value });
  //   }
  // };

  const handleFormData = (event) => {
    if (event.target.name === "intensity") {
      setFormData({ ...formData, intensity: event.target.value });
    } else if (event.target.name === "notes") {
      setFormData({ ...formData, notes: event.target.value });
    }
  };

  const stepsList = [
    <FormNewMigraineStep1
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      handleFormData={handleFormData}
      x={x}
      setX={setX}
      startDate={startDate}
      setStartDate={setStartDate}
      intensity={intensity}
      intensityDetails={intensityDetails}
      setIntensityDetails={setIntensityDetails}
      handleTrack={handleTrack}
      checkboxData={checkboxData}
      setCheckboxData={setCheckboxData}
    />,

    <FormNewMigraineStep2
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      handleFormData={handleFormData}
      x={x}
      setX={setX}
      trackersCategory={trackersCategory}
      trackersSubCategory={trackersSubCategory}
      trackers={trackers}
      handleTrack={handleTrack}
      setTrackersCategory={setTrackersCategory}
      setTrackersSubCategory={setTrackersSubCategory}
      setTrackers={setTrackers}
    />,

    <FormNewMigraineStep3
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      handleFormData={handleFormData}
      x={x}
      setX={setX}
    />,

    <FormNewMigraineStep4
      page={page}
      setPage={setPage}
      formData={formData}
      setFormData={setFormData}
      handleFormData={handleFormData}
      x={x}
      setX={setX}
    />,
  ];

  return (
    <section className="new-migraine-container">
      <div>
        <h2>Add new migraine</h2>

        <form onSubmit={handleSubmit} className="new-migraine-form">
          {stepsList[page]}
          <br />
          {page === stepsList.length - 1 && <button>Submit</button>}
          {/* <FormNewMigraineStep1
            page={page}
            setPage={setPage}
            formData={formData}
            setFormData={setFormData}
            handleFormData={handleFormData}
            x={x}
            setX={setX}
            startDate={startDate}
            setStartDate={setStartDate}
            intensity={intensity}
            intensityDetails={intensityDetails}
            setIntensityDetails={setIntensityDetails}
            handleTrack={handleTrack}
          />

          <FormNewMigraineStep2
            page={page}
            setPage={setPage}
            formData={formData}
            setFormData={setFormData}
            handleFormData={handleFormData}
            x={x}
            setX={setX}
            trackersCategory={trackersCategory}
            trackersSubCategory={trackersSubCategory}
            trackers={trackers}
            handleTrack={handleTrack}
            setTrackersCategory={setTrackersCategory}
            setTrackersSubCategory={setTrackersSubCategory}
            setTrackers={setTrackers}
          />

          <FormNewMigraineStep3 />

          <FormNewMigraineStep4
            page={page}
            setPage={setPage}
            formData={formData}
            setFormData={setFormData}
            handleFormData={handleFormData}
            x={x}
            setX={setX}
          /> */}

          {/* <DateInputStart
            name="start-date"
            id="start-date"
            value={start_date}
            handleDate={handleDate}
          />

          <DateInputEnd
            name="end-date"
            id="end-date"
            value={end_date}
            min={start_date}
            handleDate={handleDate}
          /> */}
          {/* 
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
          /> */}

          {/* <PhasesCheckbox
            checkboxData={checkboxData}
            setCheckboxData={setCheckboxData}
            handleTrack={handleTrack}
          /> */}

          {/* <Notes name="notes" value={notes} handleFormData={handleFormData} /> */}

          {/* <TrackersCheckbox
            trackersCategory={trackersCategory}
            trackersSubCategory={trackersSubCategory}
            trackers={trackers}
            handleTrack={handleTrack}
            setTrackersCategory={setTrackersCategory}
            setTrackersSubCategory={setTrackersSubCategory}
            setTrackers={setTrackers}
          /> */}

          {/* <button>Save migraine entry</button> */}
        </form>
      </div>
    </section>
  );
};

export default NewMigraine;
