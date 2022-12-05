import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import service from "../api/apiHandler";

const RadarStats = () => {
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
        // for (const cat in category) {
        //   if (cat === tracker.subcategory.category.name) {
        //     return (category[cat] += 1);
        //   }
        // }
        if (category.name === tracker.subcategory.category.name) {
          return (category.count += 1);
        }
      });
    });
  }

  //   const keys = cat.map((category) => {
  //     return category.name;
  //   });

  return (
    <div style={{ width: "40rem", height: "40rem", backgroundColor: "white" }}>
      <ResponsiveRadar
        data={cat}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 70, right: 80, bottom: 80, left: 80 }}
        borderColor={{ from: "color", modifiers: [] }}
        gridLabelOffset={60}
        dotSize={0.1}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        enableDotLabel={true}
        dotBorderColor={{ from: "color", modifiers: [] }}
        dotLabel="value"
        dotLabelYOffset={-13}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        motionConfig="default"
        // legends={[
        //   {
        //     anchor: "top-left",
        //     direction: "column",
        //     translateX: -50,
        //     translateY: -40,
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemTextColor: "#999",
        //     symbolSize: 12,
        //     symbolShape: "circle",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemTextColor: "#000",
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};

export default RadarStats;
