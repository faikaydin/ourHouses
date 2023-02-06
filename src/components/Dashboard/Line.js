import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../../theme";
import RealTimeData from "../realTimeData";
import moment from "moment";

export default function Line() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let nivoDateData = [];
  const groupBy = require("group-by-with-sum");

  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isAfter(new moment().subtract(30, "d")) &
      element.transaction_date.isBefore(new moment()) &
      (element.transaction_type === "out")
    ) {
      nivoDateData.push(element);
    }
  });

  const expenseByDate = groupBy(
    nivoDateData,
    "transaction_date",
    "transaction_amount"
  );
  let expenseByDate_ = [];

  expenseByDate.forEach((element) => {
    let payload = {};
    payload["x"] = element.transaction_date.format("MM-DD");
    payload["y"] = Math.round(element.transaction_amount);
    expenseByDate_.push(payload);
  });
  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  let nivoData = { id: "expenses", data: expenseByDate_ };
  nivoData.data = nivoData.data.sort(dynamicSort('x'));

  return (
    <ResponsiveLine
      data={[nivoData]}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.grey[100],
            color: colors.primary[400],
            fontSize: 12,
          },
        },
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        type: "point",
      }}
      yScale={{
        type: "linear",
        min: "0",
        max: "auto",
        stacked: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
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
  );
}
