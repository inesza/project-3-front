import React from "react";

const PhasesCheckbox = ({ checkboxData, handleTrack, setCheckboxData }) => {
  return (
    <section className="phases">
      <h3 className="w-100">What were the symptoms?</h3>

      {checkboxData.map((phase) => {
        return (
          <div key={phase.value} className="phase-checkbox">
            <div>
              <label htmlFor={phase.value}>
                <input
                  type="checkbox"
                  id={phase.value}
                  name={phase.value}
                  value={phase.value}
                  onChange={() =>
                    handleTrack(phase.value, setCheckboxData, checkboxData)
                  }
                  checked={phase.status}
                />
                <img src={phase.img} alt="" />
              </label>
            </div>
            <span>{phase.value}</span>
          </div>
        );
      })}
    </section>
  );
};

export default PhasesCheckbox;
