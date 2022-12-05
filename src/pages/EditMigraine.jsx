import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import service from "../api/apiHandler";
import axios from "axios";
import { getIntensityDescription } from "../helpers";
import DateInput from "../components/DateInput/DateInput";
import IntensityInput from "../components/IntensityInput/IntensityInput";
import PhasesCheckbox from "../components/PhasesCheckbox/PhasesCheckbox";
import Notes from "../components/Notes/Notes";
import TrackersCheckbox from "../components/TrackersCheckbox/TrackersCheckbox";

const EditMigraine = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [migraine, setMigraine] = useState();
  const [trackersCategory, setTrackersCategory] = useState([]);
  const [trackers, setTrackers] = useState([]);
  const [trackersSubCategory, setTrackersSubCategory] = useState([]);
  const [intensityDetails, setIntensityDetails] = useState(0);
  const [formData, setFormData] = useState({
    migraine,
  });

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
  const { start_date, end_date, intensity, notes } = formData;

  useEffect(() => {
    service
      .get(`/api/migraines/${id}`)
      .then((res) => {
        const startDate = res.data.start_date.split(".")[0].slice(0, -3);
        const endDate = res.data.end_date.split(".")[0].slice(0, -3);
        setFormData({
          _id: res.data._id,
          start_date: startDate,
          end_date: endDate,
          intensity: res.data.intensity,
          phases: res.data.phases,
          user: res.data.user,
          selected_trackers: res.data.selected_trackers,
          notes: res.data.notes,
        });
        setMigraine(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

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

      const updatedTrackers = [];

      if (migraine?.selected_trackers.length !== 0) {
        res.data.allTrackers.map((t) => {
          migraine?.selected_trackers.map((tracker) => {
            if (tracker.name === t.name) {
              updatedTrackers.push({
                name: t.name,
                status: true,
                _id: t._id,
                subcategory: t.subcategory,
              });
            } else {
              updatedTrackers.push({
                name: t.name,
                status: false,
                _id: t._id,
                subcategory: t.subcategory,
              });
            }
          });
        });
        setTrackers(updatedTrackers);
      } else if (migraine?.selected_trackers.length === 0) {
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
      }
    });
  }, [migraine]);

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
      console.log(formData);
      const { data } = await service.put(`/api/migraines/${id}`, formData);
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

  const { title, description, icon } =
    getIntensityDescription(intensityDetails);
  useEffect(() => {
    setIntensityDetails(intensity);
  }, [intensity]);

  const handleDate = (event) => {
    if (event.target.name === "start-date") {
      setFormData({ ...formData, start_date: event.target.value });
    } else if (event.target.name === "end-date") {
      setFormData({ ...formData, end_date: event.target.value });
    }
  };

  const handleFormData = (event) => {
    if (event.target.name === "intensity") {
      setFormData({ ...formData, intensity: event.target.value });
    } else if (event.target.name === "notes") {
      setFormData({ ...formData, notes: event.target.value });
    }
  };

  if (!migraine) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Migraine</h2>

        <DateInput
          name="start-date"
          id="start-date"
          value={start_date}
          handleDate={handleDate}
        />
        <DateInput
          name="end-date"
          id="end-date"
          value={end_date}
          min={migraine.start_date}
          handleDate={handleDate}
        />
        <IntensityInput
          name="intensity"
          min="0"
          max="10"
          value={migraine.intensity}
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
        <Notes name="notes" value={notes} handleFormData={handleFormData} />
        <TrackersCheckbox
          trackersCategory={trackersCategory}
          trackersSubCategory={trackersSubCategory}
          trackers={trackers}
          handleTrack={handleTrack}
          setTrackersCategory={setTrackersCategory}
          setTrackersSubCategory={setTrackersSubCategory}
          setTrackers={setTrackers}
        />
        <button>Edit migraine</button>
      </form>
    </div>
  );
};

export default EditMigraine;
