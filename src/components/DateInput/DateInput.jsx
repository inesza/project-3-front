import React from "react";

const DateInput = ({ name, id, value, min, handleDate }) => {
  return (
    <div>
      <label htmlFor={name}>Start Date:</label>
      <input
        type="datetime-local"
        name={name}
        id={id}
        min={min}
        value={value}
        onChange={(event) => {
          handleDate(event);
        }}
      />
    </div>
  );
};

export default DateInput;
