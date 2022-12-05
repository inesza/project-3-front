import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import service from "../../api/ApiHandler";

const IntensityGraph = () => {
  const [migraines, setMigraines] = useState([]);

  useEffect(() => {
    service.getAllMigraines().then((data) => {
      setMigraines(data);
    });
  }, []);

  const getAverageIntensityPerMonth = () => {
    const migrainesData = [];
    const currentDate =
      new Date().getFullYear() + "-" + (new Date().getMonth() + 1);
    console.log(currentDate);
    if (migraines.length) {
      migraines.map((migraine) => {
        let year = new Date(migraine.start_date).getFullYear();
        let month = new Date(migraine.start_date).getMonth() + 1;
        migrainesData.push({
          date: year + "-" + month,
          intensity: migraine.intensity,
          crisis: 1,
        });
      });
    }
    // Create array of objects with months as key (format : YYYY-MM)
    const months = [];
    migrainesData.map((migraine) => {
      months.push(migraine.date);
    });
    const uniqueMonths = Array.from(new Set(months)); // Remove duplicate months
    if (months.length) {
      const intensityPerMonth = uniqueMonths.reduce((acc, val) => {
        return { ...acc, [val]: [] };
      }, {});

      const crisisPerMonth = uniqueMonths.reduce((acc, val) => {
        return { ...acc, [val]: [] };
      }, {});

      //   Assign intensity and crisis to correct month
      uniqueMonths.map((date) => {
        migrainesData.map((migraine) => {
          if (migraine.date === date) {
            intensityPerMonth[date].push(migraine.intensity);
            crisisPerMonth[date].push(migraine.crisis);
          }
        });

        //   Calc average intensity per month
        const averageIntensity = intensityPerMonth[date].reduce(
          (acc, val) => acc + val,
          0
        );
        intensityPerMonth[date] = Number(
          averageIntensity / intensityPerMonth[date].length
        ).toFixed(2);

        //   Calc number of crisis per month
        const numOfCrisis = crisisPerMonth[date].reduce(
          (acc, val) => acc + val,
          0
        );
        crisisPerMonth[date] = numOfCrisis;
      });
      return [intensityPerMonth, crisisPerMonth];
    }
  };

  const calcIntensity = getAverageIntensityPerMonth();

  if (!calcIntensity) {
    return "no date";
  }

  const intensityArray = [];
  const intensityData = Object.entries(calcIntensity[0]).map(([k, v]) => {
    intensityArray.push({ x: k, y: v });
  });

  const crisisArray = [];
  const crisisData = Object.entries(calcIntensity[1]).map(([k, v]) => {
    crisisArray.push({ x: k, y: v });
  });

  const data = [
    {
      id: "Average intensity of crisis",
      color: "red",
      data: intensityArray,
    },
    {
      id: "Number of crisis per month",
      color: "blue",
      data: crisisArray,
    },
  ];

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h3>Crisis number & intensity</h3>
        <p>in the past 6 months</p>
      </div>

      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 30, bottom: 150, left: 30 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "0",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 15,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 15,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enableGridY={false}
        theme={{
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
        }}
        lineWidth={4}
        pointSize={6}
        pointBorderWidth={2}
        enablePointLabel={true}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        colors={{ scheme: "pastel1" }}
        legends={[
          {
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 100,
            itemsSpacing: 10,
            itemDirection: "left-to-right",
            itemWidth: 150,
            itemHeight: 20,
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            itemTextColor: "#ffffff",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default IntensityGraph;
