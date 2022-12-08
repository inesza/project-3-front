import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../api/apiHandler";
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
    checkboxData: [],
  });

  const {
    migraineData,
    trackersCategory,
    trackersSubCategory,
    trackers,
    formData,
    checkboxData,
  } = migraine;

  const { start_date, end_date, intensity, notes } = formData;
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let formData;
    let migraineData;
    let updatedTrackers = [];

    service
      .get(`/api/migraines/${id}`)
      .then((res) => {
        let endDate;

        // const startDate = res.data.start_date.split(".")[0].slice(0, -3);
        const rightNow = new Date();

        // Prefill start date field
        const prefillDateInput = (input) => {
          const dateNoHours = new Date(input).toISOString().split("T")[0];
          const hoursNoDate = new Date(input).toLocaleTimeString().slice(0, -3);
          return dateNoHours + "T" + hoursNoDate;
        };
        const startDate = prefillDateInput(res.data.start_date);

        if (res.data.end_date) {
          endDate = prefillDateInput(res.data?.end_date);
          setIsFinished(true);
        } else {
          endDate = prefillDateInput(rightNow);
          setIsFinished(true);
        }

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
              return {
                name: t.name,
                picture: t.picture,
                status: false,
                _id: t._id,
              };
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
        return service.get("/api/phases");
      })
      .then((res) => {
        setMigraine((currentValue) => {
          return {
            ...currentValue,
            checkboxData: res.data.map((phase) => {
              return {
                value: phase.value,
                status: migraineData.phases.includes(phase.value),
                img: phase.img,
              };
            }),
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
      formData["start_date"] = new Date(formData["start_date"]).toUTCString();
      formData["end_date"] =
        formData["end_date"] && new Date(formData["end_date"]).toUTCString();
      formData["selected_trackers"] = trackers
        .filter((tracker) => tracker.status)
        .map((tracker) => tracker._id);
      const { data } = await service.put(`/api/migraines/${id}`, formData);
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
    <section className="new-migraine-container">
      <div>
        <h2>Edit migraine</h2>
        <form onSubmit={handleSubmit}>
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
            isFinished={isFinished}
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
    </section>
  );
};

export default EditMigraine;
