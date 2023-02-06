import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import RealTimeData from "../realTimeData";
import moment from "moment";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { now } from "moment/moment";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let passToCal = [];
  let daySum = {};
  let calData = RealTimeData();
  //
  
  //
  calData.forEach((element) => {
    passToCal.push({
      id: element.id,
      title:
        element.transaction_category + "  :  $" + element.transaction_amount,
      amount: element.transaction_amount,
      date: moment(element.transaction_date).format("YYYY-MM-DD").toString(),
    });
  });

  passToCal.forEach((element) => {
    daySum[element.date] = 0;
  });

  passToCal.forEach((element) => {
    daySum[element.date] += +element.amount;
  });

  Object.keys(daySum).forEach((element) => {
    passToCal.push({
      title: "$" + Math.round(daySum[element]).toString(),
      date: element,
      color: "green",
    });
  });

  return (
    <Box m="20px">
      <Header
        title="Calendar"
        subtitle="Full Calendar Interactive Page"
      />

      <Box
        display="flex"
        justifyContent="space-between"
      >
        {/* CALENDAR */}
        <Box
          flex="1 1 100%"
          ml="15px"
        >
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
            }}
            initialView="dayGridMonth"
            selectMirror={true}
            dayMaxEvents={true}
            events={passToCal}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
