import React from "react";
import { useState, useEffect } from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";
import service from "../../api/apiHandler";

const SunburstStats = ({ theme }) => {
  const [migraines, setMigraines] = useState([]);

  useEffect(() => {
    service
      .get("api/migraines")
      .then((res) => {
        setMigraines(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  const data = {
    name: "migraine",
    color: "hsl(35, 70%, 50%)",
    children: [],
  };

  const categories = [];
  const subcategories = [];
  const trackers = [];

  migraines.forEach((migraine) => {
    migraine.selected_trackers.forEach((tracker) => {
      if (
        tracker &&
        categories.indexOf(tracker.subcategory.category.name) === -1
      ) {
        categories.push(tracker.subcategory.category.name);
      }
    });
  });
  categories.forEach((category) => {
    data.children.push({
      name: category,
      color: "hsl(226, 70%, 50%)",
      children: [],
    });
  });

  migraines.forEach((migraine) => {
    migraine.selected_trackers.forEach((tracker) => {
      data.children.forEach((category) => {
        if (
          tracker.subcategory.category.name === category.name &&
          subcategories.indexOf(tracker.subcategory.name) === -1
        ) {
          subcategories.push(tracker.subcategory.name);
          category.children.push({
            name: tracker.subcategory.name,
            color: "hsl(356, 70%, 50%)",
            children: [],
          });
        }
      });
    });
  });

  migraines.forEach((migraine) => {
    migraine.selected_trackers.forEach((tracker) => {
      data.children.forEach((category) => {
        category.children.forEach((subcategory) => {
          if (
            tracker.subcategory.name === subcategory.name &&
            trackers.indexOf(tracker.name) === -1
          ) {
            trackers.push(tracker.name);
            return subcategory.children.push({
              name: tracker.name,
              color: "hsl(316, 70%, 50%)",
              count: 1,
            });
          } else if (trackers.indexOf(tracker.name) !== -1) {
            let index = subcategory.children.findIndex(
              (x) => x.name === tracker.name
            );
            if (typeof subcategory.children[index]?.count === "number") {
              subcategory.children[index].count += 1;
            }
          }
        });
      });
    });
  });

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h3>Your most common migraine triggers</h3>
      </div>
      <div style={{ height: "400px", marginBottom: "1em" }}>
        <ResponsiveSunburst
          data={data}
          margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
          isInteractive={true}
          id="name"
          value="count"
          theme={theme}
          cornerRadius={2}
          borderWidth={3}
          // borderColor={{ theme: "background" }}
          borderColor="var(--darkest)"
          colors={{ scheme: "set3" }}
          childColor={{
            from: "color",
            modifiers: [["darker", 0.6]],
          }}
          enableArcLabels={true}
          arcLabel="id"
          arcLabelsSkipAngle={10}
          arcLabelsRadiusOffset={0.5}
          arcLabelsTextColor="white"
        />
      </div>
    </div>
  );
};

export default SunburstStats;
