import React from "react";
import { useTheme } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../theme";
import RealTimeData from "../realTimeData";
import moment from "moment";

export default function Pie() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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

  let EXPENSENIVOCAT = [
    "Grocery",
    "Outside Eating or Order",
    "Fun Stuff",
    "IMPORTANT MAN BUSINESS",
    "Ping Stuff",
    "Car Payment",
    "OC",
    "House Payment",
    "Wheels Expense",
    "Cat Town",
    "Utility",
    "Health",
    "Insurance",
    "Other",
  ];

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
    "transaction_category",
    "transaction_amount"
  );
  let nivoData = [];
  expenseByDate.forEach((element) => {
    let payload = {};
    payload["id"] = element.transaction_category;
    payload["label"] = expenseCategories[element.transaction_category];
    payload["value"] = Math.round(element.transaction_amount);
    nivoData.push(payload);
  });

  return (
    <ResponsivePie
      data={nivoData}
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
        tooltip: {
          container: {
            background: colors.grey[100],
            color: colors.primary[400],
            fontSize: 12,
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 0,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
}
