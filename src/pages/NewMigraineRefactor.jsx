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
  const [checkboxData, setCheckboxData] = useState([]);

  const [formData, setFormData] = useState({
    start_date: startDate,
    end_date: "",
    intensity: 0,
    notes: "",
  });

  //Getting all trackers, categories and subcategories to display them on form
  useEffect(() => {
    service
      .get("/api/trackers")
      .then((res) => {
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
        return service.get("/api/phases");
      })
      .then((res) => {
        setCheckboxData(res.data);
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

  const handleTrack = (id, func, obj, type) => {
    const copy = JSON.parse(JSON.stringify(obj));
    func(
      copy.map((category) => {
        if (type === "category" && category.status) category.status = false;
        if (id === category._id || id === category.value) {
          category.status = !category.status;
        }
        return category;
      })
    );
  };

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
  if (checkboxData.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <section className="new-migraine-container">
      <div>
        <h2>Add new migraine</h2>

        <form onSubmit={handleSubmit} className="new-migraine-form">
          {stepsList[page]}
          <br />
          {page === stepsList.length - 1 && <button>Submit</button>}
        </form>
      </div>
    </section>
  );
};

export default NewMigraine;
