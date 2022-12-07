import React from "react";

const Trackers = ({ id }) => {
  console.log(id);
  if (!id) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Trackers{id}</h1>
      <form>
        <button>Send</button>
      </form>
      <button>Skip</button>
    </div>
  );
};

export default Trackers;
