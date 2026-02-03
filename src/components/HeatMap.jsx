import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

/**
 * Generate fake contribution data (frontend only)
 * Pattern is stable and easy to explain
 */
const generateFakeActivity = () => {
  const data = [];
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - 364);

  let dayIndex = 0;
  let currentDate = startDate;

  while (currentDate <= today) {
    // Simple repeating pattern (0–4)
    const count = dayIndex % 5;

    data.push({
      date: currentDate.toISOString().split("T")[0],
      count,
    });

    currentDate.setDate(currentDate.getDate() + 1);
    dayIndex++;
  }

  return data;
};

const ActivityHeatmap = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const data = generateFakeActivity();
    setActivityData(data);
  }, []);

  return (
    <div className="heatmap-section">
      <h4>Contribution activity</h4>
      <div className="heatmap-scroll" aria-label="Contribution activity heatmap">
      <HeatMap
        value={activityData}
        startDate={new Date(activityData[0]?.date)}
        rectSize={14}
        space={3}
        rectProps={{ rx: 2 }}
        panelColors={{
          0: "#ebedf0",
          1: "#9be9a8",
          2: "#40c463",
          3: "#30a14e",
          4: "#216e39",
        }}
        rectRender={(props, data) => (
          <rect {...props}>
            <title>
              {data.date}: {data.count} contributions
            </title>
          </rect>
        )}
      />
      </div>

      {/* Legend */}
      <div className="heatmap-legend">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className="heatmap-legend-swatch"
            style={{
              backgroundColor: [
                "#ebedf0",
                "#9be9a8",
                "#40c463",
                "#30a14e",
                "#216e39",
              ][level],
            }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
