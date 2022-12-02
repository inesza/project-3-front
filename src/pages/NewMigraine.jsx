import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import useCheckbox from "../hooks/useCheckbox";
import apiHandler from "./../api/apiHandler";
import service from "./../api/apiHandler";
import axios from "axios";
import UserContext from "../auth/UserContext";
import Trackers from "./Trackers";

const NewMigraine = () => {
  const navigate = useNavigate();
  const [trackersCategory, setTrackersCategory] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [trackersSubCategory, setTrackersSubCategory] = useState([]);

  //! Delete later
  //   const [checkboxCategoryData, setCheckboxCategoryData, resetCheckboxCategory] =
  //     useCheckbox({
  //       Nutrition: false,
  //       Activities: false,
  //       Environment: false,
  //       Health: false,
  //     });
  const rightNow = new Date().toISOString().split(".")[0].slice(0, -3);
  const [startDate, setStartDate] = useState(rightNow);

  // Handling the "phases" checkboxes values for the form
  const [checkboxData, setCheckboxData, resetCheckbox] = useCheckbox({
    Prodrome: false,
    Postdrome: false,
    Aura: false,
    Headache: false,
    "Other/Unsure": false,
  });

  const [formData, setFormData] = useState({
    start_date: startDate,
    end_date: "",
    intensity: 0,
    notes: "",
  });

  //Getting all trackers, categories and subcategories to display them on form
  useEffect(() => {
    service.get("/api/trackers").then((res) => {
      console.log(res.data);
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

  // Defining the today's date in UT for the start date of migraine crisis

  const { start_date, end_date, intensity, notes } = formData;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cat = trackersCategory.filter((x) => x.status);
      const subCat = trackersSubCategory.filter((x) => x.status);
      const track = trackers.filter((x) => x.status);
      const arr = [...cat, ...subCat, ...track];
      const phases = [];
      for (const phase in checkboxData) {
        if (checkboxData[phase]) {
          phases.push(phase);
        }
      }
      formData["phases"] = phases;
      formData["selected_trackers"] = trackers
        .filter((tracker) => tracker.status)
        .map((tracker) => tracker._id);
      console.log(formData);
      const { data } = await service.post("/api/migraines", formData);
      console.log("New migraine: ", data);

      //navigate("/migraines/trackers");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubCategory = (id) => {
    const copy = JSON.parse(JSON.stringify(trackersSubCategory));
    setTrackersSubCategory(
      copy.map((category) => {
        if (id === category._id) {
          category.status = !category.status;
        }
        return category;
      })
    );
  };

  const handleTracker = (id) => {
    const copy = JSON.parse(JSON.stringify(trackers));
    setTrackers(
      copy.map((category) => {
        if (id === category._id) {
          category.status = !category.status;
        }
        return category;
      })
    );
  };

  const handleCategory = (id) => {
    const copy = JSON.parse(JSON.stringify(trackersCategory));
    setTrackersCategory(
      copy.map((category) => {
        if (id === category._id) {
          category.status = !category.status;
        }
        return category;
      })
    );
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
            value={start_date}
            onChange={(event) => {
              setStartDate(event.target.value);
              setFormData({ ...formData, start_date: event.target.value });
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
            min={start_date}
            onChange={(event) => {
              setFormData({ ...formData, end_date: event.target.value });
            }}
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
        <h2>Trackers Category</h2>
        <ul>
          {trackersCategory.map((trackerCategory) => {
            return (
              <div key={trackerCategory._id}>
                <h2>
                  {" "}
                  <label htmlFor={trackerCategory.name}>
                    {trackerCategory.name}
                  </label>
                  {/* <input
                  type="checkbox"
                  id={trackerCategory.name}
                  name={trackerCategory.name}
                  value={trackerCategory.name}
                  onChange={setCheckboxCategoryData}
                  checked={checkboxCategoryData[trackerCategory.name]}
                /> */}
                  <input
                    type="checkbox"
                    id={trackerCategory.name}
                    name={trackerCategory.name}
                    value={trackerCategory.name}
                    onChange={() => handleCategory(trackerCategory._id)}
                    checked={trackerCategory.status}
                  />
                </h2>

                {trackerCategory.status &&
                  trackersSubCategory
                    .filter(
                      (trackerSubCategory) =>
                        trackerSubCategory.category === trackerCategory._id
                    )
                    .map((trackerSubCategory) => {
                      return (
                        <div>
                          <div key={trackerSubCategory._id}>
                            <h3>
                              <label htmlFor={trackerSubCategory.name}>
                                {trackerSubCategory.name}
                              </label>
                              <input
                                type="checkbox"
                                id={trackerSubCategory.name}
                                name={trackerSubCategory.name}
                                value={trackerSubCategory.name}
                                checked={trackerSubCategory.status}
                                onChange={() =>
                                  handleSubCategory(trackerSubCategory._id)
                                }
                              />
                            </h3>
                          </div>
                          {trackerSubCategory.status &&
                            trackers
                              .filter(
                                (tracker) =>
                                  tracker.subcategory === trackerSubCategory._id
                              )
                              .map((tracker) => {
                                return (
                                  <div key={tracker._id}>
                                    <label htmlFor={tracker.name}>
                                      {tracker.name}
                                    </label>
                                    <input
                                      type="checkbox"
                                      id={tracker.name}
                                      name={tracker.name}
                                      value={tracker.name}
                                      checked={tracker.status}
                                      onChange={() =>
                                        handleTracker(tracker._id)
                                      }
                                    />
                                  </div>
                                );
                              })}
                        </div>
                      );
                    })}
              </div>
            );
          })}
        </ul>
        {/* {!trackersSubCategory.length !== 0 && (
          <>
            <h2>Trackers Subcategory</h2>
            <ul>
              {trackersSubCategory.map((trackerSubCategory) => {
                return (
                  <div key={trackerSubCategory._id}>
                    <label htmlFor={trackerSubCategory.name}>
                      {trackerSubCategory.name}
                    </label>
                    <input
                      type="checkbox"
                      id={trackerSubCategory.name}
                      name={trackerSubCategory.name}
                      value={trackerSubCategory.name}
                    />
                  </div>
                );
              })}
            </ul>
          </>
        )} */}
        {/* {!trackers.length !== 0 && (
          <>
            <h2>Trackers</h2>
            <ul>
              {trackers.map((tracker) => {
                return (
                  <div key={tracker._id}>
                    <label htmlFor={tracker.name}>{tracker.name}</label>
                    <input
                      type="checkbox"
                      id={tracker.name}
                      name={tracker.name}
                      value={tracker.name}
                    />
                  </div>
                );
              })}
            </ul>
          </>
        )} */}

        <button>Add new migraine</button>
      </form>
    </div>
  );
};

export default NewMigraine;
