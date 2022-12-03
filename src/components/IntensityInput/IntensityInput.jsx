import React from "react";

const IntensityInput = ({
  name,
  min,
  max,
  value,
  intensity,
  title,
  description,
  icon,
  handleFormData,
}) => {
  return (
    <div>
      {" "}
      <label htmlFor="intensity">Intensity:</label>
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
        {intensity}
        {title}
        {description}
        {icon}
      </div>
    </div>
  );
};

export default IntensityInput;
