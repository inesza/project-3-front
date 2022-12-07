import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import service from "./../../api/apiHandler";

const IntensityGraph = ({ theme }) => {
  const [migraines, setMigraines] = useState([]);

  useEffect(() => {
    service.getAllMigraines().then((data) => {
      setMigraines(data);
    });
  }, []);

  const getAverageIntensityPerMonth = () => {
    const migrainesData = [];
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

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
    // Create array of objects with the past 6 months as key (format : YYYY-MM)
    const months = [];
    for (let i = 6; i > 0; i--) {
      let timePeriod = new Date();
      timePeriod.setMonth(timePeriod.getMonth() + 1 - i);
      let year = new Date(timePeriod).getFullYear();
      let month = new Date(timePeriod).getMonth() + 1;
      let monthFormatted = `${year}-${month}`;
      months.push(monthFormatted);
    }
    if (months.length) {
      const intensityPerMonth = months.reduce((acc, val) => {
        return { ...acc, [val]: [] };
      }, {});

      const crisisPerMonth = months.reduce((acc, val) => {
        return { ...acc, [val]: [] };
      }, {});

      //   Assign intensity and crisis to correct month
      months.map((date) => {
        migrainesData.map((migraine) => {
          if (migraine.date === date) {
            intensityPerMonth[date].push(migraine.intensity);
            crisisPerMonth[date].push(migraine.crisis);
          }
        });
        if (!intensityPerMonth[date].length) {
          intensityPerMonth[date].push(0); // Put intensity of 0 if no data for the month
          crisisPerMonth[date].push(0); // Put number of crisis at 0 if not data for the month
        }

        // Calc average intensity per month
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
    return "no data";
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
    <div>
      <div style={{ textAlign: "center" }}>
        <h3>Crisis number & intensity</h3>
        <p>in the past 6 months</p>
      </div>
      <div style={{ height: "400px", marginBottom: "1em" }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 30, bottom: 150, left: 50 }}
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
          theme={theme}
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
      </div>
    </div>
  );
};

export default IntensityGraph;
