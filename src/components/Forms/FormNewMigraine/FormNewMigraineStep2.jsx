import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";
import useCheckbox from "../../../hooks/useCheckbox";

const FormNewMigraineStep2 = () => {
  const [trackersCategory, setTrackersCategory] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [trackersSubCategory, setTrackersSubCategory] = useState([]);
  const [checkboxData, setCheckboxData, resetCheckbox] = useCheckbox({
    Nutrition: false,
    Activities: false,
    Environment: false,
    Health: false,
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/trackers").then((res) => {
      //setTrackers(res.data.allTrackers);
      setTrackersCategory(res.data.allTrackersCategory);
      //setTrackersSubCategory(res.data.allTrackersSubCategory);
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Trackers Category</h2>
      <ul>
        {trackersCategory.map((trackerCategory) => {
          return (
            <div key={trackerCategory._id}>
              <label htmlFor={trackerCategory.name}>
                {trackerCategory.name}
              </label>
              <input
                type="checkbox"
                id={trackerCategory.name}
                name={trackerCategory.name}
                value={trackerCategory.name}
                onChange={setCheckboxData}
                checked={checkboxData[trackerCategory.name]}
              />
            </div>
          );
        })}
      </ul>
      {trackersSubCategory.length !== 0 && (
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
      )}
      {trackers.length !== 0 && (
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
      )}
    </div>
  );
};

export default FormNewMigraineStep2;
