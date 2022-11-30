import React from "react";
import { useState, useEffect } from "react";

const NewMigraine = () => {
  return (
    <div>
      <h2>Add new migraine</h2>
      <form>
        <div>
          <label htmlFor="start-date">Start Date:</label>
          <input type="date" name="start-date" id="start-date" />
        </div>
        <div>
          <label htmlFor="end-date">End Date:</label>
          <input type="date" name="end-date" id="end-date" />
        </div>
        <div>
          <label htmlFor="intensity">Intensity:</label>
          <input
            type="range"
            name="intensity"
            id="intensity"
            min="0"
            max="10"
            list="tickmarks"
          />
        </div>
      </form>
    </div>
  );
};

export default NewMigraine;
