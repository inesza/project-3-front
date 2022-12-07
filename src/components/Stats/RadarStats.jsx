import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import service from "../../api/apiHandler";

const RadarStats = ({ theme }) => {
  const [migraines, setMigraines] = useState([]);

  useEffect(() => {
    service
      .get("api/migraines")
      .then((res) => {
        setMigraines(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const cat = [
    {
      name: "Nutrition",
      count: 0,
    },
    {
      name: "Activities",
      count: 0,
    },
    {
      name: "Environment",
      count: 0,
    },
    {
      name: "Health",
      count: 0,
    },
  ];
  for (const migraine of migraines) {
    migraine.selected_trackers.forEach((tracker) => {
      cat.map((category) => {
        if (category.name === tracker.subcategory.category.name) {
          return (category.count += 1);
        }
      });
    });
  }

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h3>Your most common categories of migraine triggers</h3>
      </div>
      <div style={{ height: "400px", marginBottom: "1em" }}>
        <ResponsiveRadar
          data={cat}
          keys={["count"]}
          indexBy="name"
          margin={{ top: 40, right: 65, bottom: 20, left: 50 }}
          theme={theme}
          gridLabelOffset={15}
          dotSize={0.1}
          dotColor="var(--orange)"
          dotBorderWidth={2}
          enableDotLabel={true}
          borderColor="var(--orange)"
          borderWidth={4}
          dotLabel="value"
          dotLabelYOffset={3}
          fillOpacity={0.5}
          motionConfig="default"
        />
      </div>
    </div>
  );
};

export default RadarStats;
