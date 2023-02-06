import React from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../../theme";
import RealTimeData from "../realTimeData";
import moment from "moment";


export default function Bar() {
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
      element.transaction_date.isAfter(new moment().subtract(14, "d")) &
      element.transaction_date.isBefore(new moment()) &
      (element.transaction_type === "out")
    ) {
      nivoDateData.push(element);
    }
  });

  const expenseByDate = groupBy(
    nivoDateData,
    "transaction_date,transaction_category",
    "transaction_amount"
  );

  let expenseByDate_ = [];
  let nivoData = [];

  expenseByDate.forEach((element) => {
    const cat = expenseCategories.find(
      (item) => item.value === element.transaction_category
    ).label;
    let payload = {};
    payload["date"] = element.transaction_date.format("MM-DD");
    payload["cat"] = cat;
    payload["amount"] = Math.round(element.transaction_amount);
    expenseByDate_.push(payload);
  });
  let dates = [];
  expenseByDate_.forEach((element) => {
    if (!dates.includes(element.date)) {
      dates.push(element.date);
    }
  });

  let vivoPayload = {};

  dates.forEach((element) => {
    vivoPayload = { date: element };
    EXPENSENIVOCAT.forEach((e) => {
      vivoPayload[e] = 0;
    });
    nivoData.push(vivoPayload);
  });

  expenseByDate_.forEach((e) => {
    nivoData.forEach((r) => {
      if (e.date === r.date) {
        r[e.cat] += e.amount;
      }
    });
  });

  return (

    <ResponsiveBar
      data={nivoData}
      theme={{
        // added
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
          basic: {},
          chip: {},
          table: {},
          tableCell: {},
          tableCellValue: {},
        },
      }}
      keys={[
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
      ]}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      xScale={{
        type: "time",
        format: "%m-%d",
        precision: "day",
      }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "set3" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
}
