import React from "react";

const Notes = ({ name, value, handleFormData }) => {
  return (
    <div>
      <label htmlFor="notes">Notes: </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(event) => handleFormData(event)}
      ></textarea>
    </div>
  );
};

export default Notes;
