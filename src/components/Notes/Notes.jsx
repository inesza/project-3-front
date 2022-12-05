import React from "react";

const Notes = ({ name, value, handleFormData }) => {
  return (
    <section>
      <h3 className="w-100">Notes</h3>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(event) => handleFormData(event)}
      ></textarea>
    </section>
  );
};

export default Notes;
