import React from "react";

const IntensityInput = ({
  name,
  min,
  max,
  intensity,
  title,
  description,
  handleFormData,
}) => {
  return (
    <section>
      <h3 className="w-100">How bad was it ?</h3>
      <input
        type="range"
        name={name}
        id={name}
        min={min}
        max={max}
        value={intensity}
        onChange={(event) => handleFormData(event)}
      />
      <div className="intensity-description">
        <div className="intensity-header">
          <span>{title}</span>
          <span>{intensity}/10</span>
        </div>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default IntensityInput;
