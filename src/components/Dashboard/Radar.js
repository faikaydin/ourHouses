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
  const expenseCategories = [
    { value: "Grocery", label: "Grocery" },
    { value: "Outside_Eating_or_Order", label: "Outside Eating or Order" },
    { value: "Fun_Stuff", label: "Fun Stuff" },
    { value: "Ez", label: "IMPORTANT MAN BUSINESS" },
    { value: "Ping", label: "Ping Stuff" },
    { value: "Car_Payment", label: "Car Payment" },
    { value: "OC_Land_Tax", label: "OC" },
    { value: "Mortgage", label: "House Payment" },
    { value: "Car_Expense", label: "Wheels Expense" },
    { value: "Cat", label: "Cat Town" },
    { value: "Utility", label: "Utility" },
    { value: "Health", label: "Health" },
    { value: "Insurance", label: "Insurance" },
    { value: "Other", label: "Other" },
  ];

  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isAfter(new moment().subtract(30, "d")) &
      element.transaction_date.isBefore(new moment()) &
      (element.transaction_type === "out")
    ) {
      nivoDateData.push(element);
    }
  });

  let dates = [];

  nivoDateData.forEach((element) => {
    if (!dates.includes(element.transaction_date.format("MM-DD"))) {
      dates.push(element.transaction_date.format("MM-DD"));
    }
    dates = dates.sort();
  });
  const expenseByDate = groupBy(
    nivoDateData,
    "transaction_date,transaction_category",
    "transaction_amount"
  );

  let nivoData = [];

  expenseByDate.forEach((element) => {
    const cat = expenseCategories.find(
      (item) => item.value === element.transaction_category
    ).label;
    if (!nivoData.find((x) => x.id == cat)) {
      nivoData.push({ id: cat, data: [] });
    }
  });
  nivoData.forEach((element) => {
    dates.forEach((datex) => {
      element.data.push({ x: datex, y: 0 });
    });
  });
  expenseByDate.forEach((element) => {
    const cat = expenseCategories.find(
      (item) => item.value === element.transaction_category
    ).label;
    let payload = {};
    payload["x"] = element.transaction_date.format("MM-DD");
    payload["y"] = Math.round(element.transaction_amount);
    nivoData.find((x) => x.id == cat).data.find((y) => y.x == payload.x).y =
      payload.y;
  });


  return (
    <ResponsiveLine
      data={nivoData}
      tooltip={({ point }) => {
        return (
            <div
                style={{
                  background: colors.grey[100],
                  color: colors.primary[400],
                  fontSize: 12,
                }}
            >
                <div>category: {point.id}</div>
                <div>date: {point.data.x}</div>
                <div>amount: {point.data.y}</div>
            </div>
        )
    }} 
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
      }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
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
