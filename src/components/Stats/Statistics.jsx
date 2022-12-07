import React, { useState, useEffect } from "react";
import IntensityGraph from "./IntensityGraph";
import RadarStats from "./RadarStats";
import { Link } from "react-router-dom";

const Statistics = ({ full }) => {
  const theme = {
    background: "transparent",
    textColor: "#fff",
    fontSize: 14,
    axis: {
      domain: {
        line: {
          stroke: "var(--dark-blue)",
          strokeWidth: 2,
        },
      },
      legend: {
        text: {
          fontSize: 12,
          fill: "white",
        },
      },
      ticks: {
        line: {
          stroke: "var(--dark-blue)",
          strokeWidth: 1,
        },
        text: {
          fontSize: 12,
          fill: "white",
        },
      },
    },
    grid: {
      line: {
        stroke: "var(--dark-blue)",
        strokeWidth: 1,
      },
    },
    legends: {
      title: {
        text: {
          fontSize: 11,
          fill: "#333333",
        },
      },
      text: {
        fontSize: 11,
        fill: "#333333",
      },
      ticks: {
        line: {},
        text: {
          fontSize: 10,
          fill: "#333333",
        },
      },
    },
    annotations: {
      text: {
        fontSize: 16,
        fill: "#333333",
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      link: {
        stroke: "#000000",
        strokeWidth: 1,
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      outline: {
        stroke: "#000000",
        strokeWidth: 2,
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
      symbol: {
        fill: "#000000",
        outlineWidth: 2,
        outlineColor: "#ffffff",
        outlineOpacity: 1,
      },
    },
    tooltip: {
      container: {
        background: "#ffffff",
        color: "#333333",
        fontSize: 12,
      },
      basic: {},
      chip: {},
      table: {},
      tableCell: {},
      tableCellValue: {},
    },
  };

  const statistics = [
    <IntensityGraph key={"Intensity graph"} theme={theme} />,
    <RadarStats key={"radar stats"} theme={theme} />,
  ];
  const [stats, setStats] = useState(statistics);

  useEffect(() => {
    if (!full) {
      let randomStatIndex = Math.floor(Math.random() * statistics.length);
      setStats(statistics.slice(randomStatIndex, randomStatIndex + 1));
    }
  }, []);

  return (
    <section className={!full ? "stats-section dark-bg-orange-shadow" : ""}>
      <h2>My Statistics</h2>
      <div className="stats">
        {stats.map((stat, index) => {
          return (
            <section
              className={full ? "stats-section dark-bg-orange-shadow" : ""}
              key={index}
            >
              {stat}
            </section>
          );
        })}
      </div>

      {!full && (
        <div style={{ textAlign: "center" }}>
          <Link
            to="/migraines/statistics"
            className="btn btn-orange-shadow-mint"
          >
            More stats
          </Link>
        </div>
      )}
    </section>
  );
};

export default Statistics;
