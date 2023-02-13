import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PetsIcon from "@mui/icons-material/Pets";
import RealTimeData from "../realTimeData";
import { tokens } from "../../theme";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import Pie from "./Pie";
import Radar from "./Radar";
import Line from "./Line";
import Bar from "./Bar";
import moment from "moment";
import StatBox from "../StatBox.js";
import { getDatabase, ref, set, onValue } from "firebase/database";
import app from "../../firebase";

const Dashboard = () => {
  // panel one
  let weeklySpend_1 = [];
  let weeklySpend_1_val = 0;
  let weeklySpend_2 = [];
  let weeklySpend_2_val = 0;
  let weeklySpend_3 = [];
  let weeklySpend_3_val = 0;
  let weeklySpend_4 = [];
  let weeklySpend_4_val = 0;
  let eatout = [];
  let eatout_val = 0;
  let recentTransactions = [];

  const [displayValue, setDisplayValue] = useState();

  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isAfter(new moment().subtract(7, "d")) &
      element.transaction_date.isBefore(new moment()) &
      (element.transaction_type === "out") &
      (element.transaction_category != "OC_Land_Tax")
    ) {
      weeklySpend_1.push(element);
    }
  });

  RealTimeData().forEach((element) => {
    if (
      (element.transaction_date.isSame(moment().startOf("isoWeek")) |
        element.transaction_date.isAfter(moment().startOf("isoWeek"))) &
      (element.transaction_type === "out") &
      ((element.transaction_category === "Grocery") |
        (element.transaction_category === "Outside_Eating_or_Order") |
        (element.transaction_category === "Fun_Stuff") |
        (element.transaction_category === "Ez") |
        (element.transaction_category === "Ping"))
    ) {
      weeklySpend_4.push(element);
    }
  });

  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isAfter(new moment().subtract(30, "d")) &
      element.transaction_date.isBefore(new moment()) &
      (element.transaction_type === "out") &
      (element.transaction_category !== "OC_Land_Tax")
    ) {
      weeklySpend_3.push(element);
    }
  });

  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isAfter(new moment().subtract(14, "d")) &
      element.transaction_date.isBefore(new moment().subtract(7, "d")) &
      (element.transaction_type === "out") &
      (element.transaction_category != "OC_Land_Tax")
    ) {
      weeklySpend_2.push(element);
    }
  });

  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isAfter(new moment().subtract(2, "d")) &
      element.transaction_date.isBefore(new moment().subtract()) &
      (element.transaction_type === "out")
    ) {
      recentTransactions.push(element);
    }
  });

  RealTimeData().forEach((element) => {
    if (
      element.transaction_date.isAfter(new moment().subtract(7, "d")) &
      element.transaction_date.isBefore(new moment()) &
      (element.transaction_type === "out") &
      (element.transaction_category == "Outside_Eating_or_Order")
    ) {
      eatout.push(element);
    }
  });

  weeklySpend_1.forEach((element) => {
    weeklySpend_1_val += Math.round(+element.transaction_amount);
  });

  weeklySpend_2.forEach((element) => {
    weeklySpend_2_val += Math.round(+element.transaction_amount);
  });

  weeklySpend_3.forEach((element) => {
    weeklySpend_3_val += Math.round(+element.transaction_amount);
  });

  weeklySpend_4.forEach((element) => {
    weeklySpend_4_val += Math.round(+element.transaction_amount);
  });
  console.log(weeklySpend_4);
  console.log(weeklySpend_4_val);

  eatout.forEach((element) => {
    eatout_val += Math.round(+element.transaction_amount);
  });

  useEffect(() => {
    const fetchData = async () =>
      onValue(ref(getDatabase(app), "savings/0"), (snapshot) => {
        setDisplayValue(snapshot._node.value_);
      });

    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Header
          title="DASHBOARD"
          subtitle="Pupupupupupupupupup 💸 🥐 🎮"
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={"$" + weeklySpend_1_val}
            subtitle="This Week Spent"
            progress="0.75"
            increase={
              Math.round((weeklySpend_1_val * 100) / weeklySpend_2_val) +
              "% of last week"
            }
            icon={
              <ShoppingBagIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Number of Cats"
            progress="0.50"
            increase="too many cats"
            icon={
              <PetsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={"$" + eatout_val + "/ $"+weeklySpend_4_val}
            subtitle="eating out this week / total since last Monday!"
            progress="0.30"
            increase=""
            icon={
              <FastfoodIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={"$" + displayValue}
            subtitle="Money Saved"
            icon={
              <AccountBalanceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                All Money Spent This Month
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {"$" + Math.round(weeklySpend_3_val)}
              </Typography>
            </Box>
            <Box></Box>
          </Box>
          <Box
            height="250px"
            m="-20px 0 0 0"
          >
            <Line />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontWeight="600"
            >
              Recent Transactions
            </Typography>
          </Box>
          {recentTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.transaction_category}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.transaction_item}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>
                {transaction.transaction_date.format("MM-DD")}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.transaction_amount}
              </Box>
            </Box>
          ))}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h5"
                fontWeight="600"
              ></Typography>
              <Typography color={colors.grey[100]}></Typography>
            </Box>
            <Box color={colors.grey[100]}></Box>
            <Box
              backgroundColor={colors.greenAccent[500]}
              p="5px 10px"
              borderRadius="4px"
            ></Box>
          </Box>
        </Box>

        {/* ROW 2.5 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Our Monieeeees 💰💰💰
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Last 3 Months spend by time
              </Typography>
            </Box>
            <Box></Box>
          </Box>
          <Box
            height="250px"
            m="-20px 0 0 0"
          >
            <Radar />
          </Box>
        </Box>

        {/* ROW 3 */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Last 2 Wks of Spendiesss
          </Typography>
          <Box
            height="250px"
            mt="-20px"
          >
            <Bar />
          </Box>
        </Box>
        <Box
          height="20hx"
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Pie Snacks - 1 Month
          </Typography>
          <Pie />

          <Box height="200px"></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
