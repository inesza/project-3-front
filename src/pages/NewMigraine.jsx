import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import useCheckbox from "../hooks/useCheckbox";
import apiHandler from "./../api/apiHandler";
import service from "./../api/apiHandler";
import axios from "axios";

const NewMigraine = () => {
  const navigate = useNavigate();
  const rightNow = new Date().toISOString().split(".")[0].slice(0, -3);
  const [startDate, setStartDate] = useState(rightNow);
  const [formError, setFormError] = useState(false);
  const [checkboxData, setCheckboxData, resetCheckbox] = useCheckbox({
    Prodrome: false,
    Postdrome: false,
    Aura: false,
    Headache: false,
    "Other/Unsure": false,
  });
  var someDate = new Date();
  var date = someDate.setDate(someDate.getDate());
  var defaultValue = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    start_date: startDate,
    end_date: null,
    intensity: null,
    notes: "",
  });
  const { start_date, end_date, intensity, notes } = formData;

  const handleSubmit = async (event) => {
    try {
      console.log(formData.start_date);
      event.preventDefault();
      const phases = [];
      for (const phase in checkboxData) {
        if (checkboxData[phase]) {
          phases.push(phase);
        }
      }
      formData["phases"] = phases;
      const { data } = await axios.post(
        "http://localhost:8080/api/migraines",
        formData
      );
      console.log("New migraine: ", data);
      setFormError(false);
      navigate("/migraines/trackers");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add new migraine</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="start-date">Start Date:</label>
          <input
            type="datetime-local"
            name="start-date"
            id="start-date"
            value={startDate}
            onChange={(event) => {
              setStartDate(event.target.value);
              setFormData({ ...formData, start_date: startDate });
            }}
          />
        </div>
        <div>
          <label htmlFor="end-date">End Date:</label>
          <input
            type="datetime-local"
            name="end-date"
            id="end-date"
            value={end_date}
            onChange={(event) =>
              setFormData({ ...formData, end_date: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="intensity">Intensity:</label>
          <input
            type="range"
            name="intensity"
            id="intensity"
            min="0"
            max="10"
            value={intensity}
            onChange={(event) =>
              setFormData({ ...formData, intensity: event.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="phases">Phases:</label>

          {Object.keys(checkboxData).map((phase, index) => {
            return (
              <>
                <label htmlFor={phase}>{phase}: </label>
                <input
                  key={phase}
                  type="checkbox"
                  id={phase}
                  name={phase}
                  value={phase}
                  onChange={setCheckboxData}
                  checked={checkboxData[phase]}
                />
              </>
            );
          })}
        </div>

        <div>
          <label htmlFor="notes">Notes: </label>
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(event) =>
              setFormData({ ...formData, notes: event.target.value })
            }
          ></textarea>
        </div>
        <button>Add new migraine</button>
      </form>
    </div>
  );
};

export default NewMigraine;
