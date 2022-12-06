import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import service from "../api/apiHandler";
import axios from "axios";
import { getIntensityDescription } from "../helpers";
import IntensityInput from "../components/IntensityInput/IntensityInput";
import PhasesCheckbox from "../components/PhasesCheckbox/PhasesCheckbox";
import Notes from "../components/Notes/Notes";
import TrackersCheckbox from "../components/TrackersCheckbox/TrackersCheckbox";
import DateInputStart from "../components/DateInput/DateInputStart";
import DateInputEnd from "../components/DateInput/DateInputEnd";

const EditMigraine = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [migraine, setMigraine] = useState({
    migraineData: null,
    trackersCategory: [],
    trackersSubCategory: [],
    trackers: [],
    formData: {},
    checkboxData: [
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
    ],
  });

  // console.log(migraine);
  const {
    migraineData,
    trackersCategory,
    trackersSubCategory,
    trackers,
    formData,
    checkboxData,
  } = migraine;

  const { start_date, end_date, intensity, notes } = formData;

  useEffect(() => {
    let formData;
    let migraineData;
    let updatedTrackers = [];

    service
      .get(`/api/migraines/${id}`)
      .then((res) => {
        let endDate;
        const startDate = res.data.start_date.split(".")[0].slice(0, -3);
        if (res.data.end_date) {
          endDate = res.data?.end_date.split(".")[0].slice(0, -3);
        }
        const rightNow = new Date().toISOString().split(".")[0].slice(0, -3);
        endDate = rightNow;

        const selectedPhases = res.data.phases.map((phase) => phase.name);
        const phases = [];

        res.data.phases.forEach((phase) => {
          phases.push({
            value: phase.value,
            status: selectedPhases.includes(phase.value),
            img: phase.img,
          });
        });

        formData = {
          _id: res.data._id,
          start_date: startDate,
          end_date: endDate,
          intensity: res.data.intensity,
          phases: phases,
          user: res.data.user,
          selected_trackers: res.data.selected_trackers,
          notes: res.data.notes,
        };
        migraineData = res.data;

        return service.get("/api/trackers");
      })
      .then((res) => {
        const selectedTrackers = migraineData.selected_trackers.map(
          (t) => t.name
        );

        res.data.allTrackers.forEach((t) => {
          updatedTrackers.push({
            name: t.name,
            status: selectedTrackers.includes(t.name),
            _id: t._id,
            subcategory: t.subcategory,
          });
        });

        setMigraine((currentValue) => {
          return {
            ...currentValue,
            migraineData,
            formData,
            trackersCategory: res.data.allTrackersCategory.map((t) => {
              return { name: t.name, status: false, _id: t._id };
            }),
            trackersSubCategory: res.data.allTrackersSubCategory.map((t) => {
              return {
                name: t.name,
                status: false,
                _id: t._id,
                category: t.category,
              };
            }),
            trackers: updatedTrackers,
          };
        });
      })
      .catch((e) => console.log(e));
  }, []);

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
      // console.log(formData);
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

  const { title, description, icon } = getIntensityDescription(intensity);

  const handleDate = (event) => {
    if (event.target.name === "start-date") {
      setMigraine({
        ...migraine,
        formData: { ...formData, start_date: event.target.value },
      });
    } else if (event.target.name === "end-date") {
      setMigraine({
        ...migraine,
        formData: { ...formData, end_date: event.target.value },
      });
    }
  };

  const handleFormData = (event) => {
    if (event.target.name === "intensity") {
      setMigraine({
        ...migraine,
        formData: { ...formData, intensity: event.target.value },
      });
    } else if (event.target.name === "notes") {
      setMigraine({
        ...migraine,
        formData: { ...formData, notes: event.target.value },
      });
    }
  };

  if (!migraineData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit Migraine</h2>

        <DateInputStart
          name="start-date"
          id="start-date"
          value={start_date}
          handleDate={handleDate}
        />
        <DateInputEnd
          name="end-date"
          id="end-date"
          value={end_date}
          min={migraineData.start_date}
          handleDate={handleDate}
        />
        <IntensityInput
          name="intensity"
          min="0"
          max="10"
          value={migraineData.intensity}
          intensity={intensity}
          title={title}
          description={description}
          icon={icon}
          handleFormData={handleFormData}
        />
        <PhasesCheckbox
          checkboxData={checkboxData}
          setCheckboxData={(newValue) => {
            setMigraine({ ...migraine, checkboxData: newValue });
          }}
          handleTrack={handleTrack}
        />
        <Notes name="notes" value={notes} handleFormData={handleFormData} />
        <TrackersCheckbox
          trackersCategory={trackersCategory}
          trackersSubCategory={trackersSubCategory}
          trackers={trackers}
          handleTrack={handleTrack}
          setTrackersCategory={(newValue) => {
            setMigraine({ ...migraine, trackersCategory: newValue });
          }}
          setTrackersSubCategory={(newValue) => {
            setMigraine({ ...migraine, trackersSubCategory: newValue });
          }}
          setTrackers={(newValue) => {
            setMigraine({ ...migraine, trackers: newValue });
          }}
        />
        <button>Edit migraine</button>
      </form>
    </div>
  );
};

export default EditMigraine;
