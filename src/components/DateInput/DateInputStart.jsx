import React from "react";

const DateInputStart = ({ name, id, value, min, handleDate }) => {
  return (
    <section>
      <h3 className="w-100">When did it start?</h3>
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
    </section>
  );
};

export default DateInputStart;
