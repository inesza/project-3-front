import React, { useEffect, useState } from "react";

const DateInputEnd = ({ name, id, value, min, handleDate, isFinished }) => {
  const [finished, setFinished] = useState(isFinished);
  const [bgColorFalse, setBgColorFalse] = useState("var(--orange)");
  const [bgColorTrue, setBgColorTrue] = useState("transparent");
  useEffect(() => {
    if (isFinished) {
      setBgColorFalse("transparent");
      setBgColorTrue("var(--orange)");
    }
  }, []);

  const handleFinishState = (state) => {
    if (state === true) {
      setFinished(true);
      setBgColorFalse("transparent");
      setBgColorTrue("var(--orange)");
    } else {
      setFinished(false);
      setBgColorFalse("var(--orange)");
      setBgColorTrue("transparent");
    }
  };

  return (
    <section className="migraine-over-selector">
      <h3 className="w-100">Is it over yet?</h3>
      <span
        className="btn btn-select"
        style={{ background: bgColorTrue, transition: ".5s" }}
        onClick={() => handleFinishState(true)}
      >
        Yes
      </span>
      <span
        className="btn btn-select"
        style={{ background: bgColorFalse, transition: ".5s" }}
        onClick={() => handleFinishState(false)}
      >
        No
      </span>

      {finished && (
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
      )}
    </section>
  );
};

export default DateInputEnd;
