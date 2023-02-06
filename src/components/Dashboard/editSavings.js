import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { getDatabase, ref, set, onValue } from "firebase/database";
import app from "../../firebase";
import {
  Box,
  useTheme
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../Header";
import { tokens } from "../../theme";


const EditSavings = () => {
  const [value, setValue] = useState();
  const [displayValue, setDisplayValue] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () =>
      onValue(ref(getDatabase(app), "savings/0"), (snapshot) => {
        setDisplayValue(snapshot._node.value_);
      });

    fetchData();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    set(ref(getDatabase(app), `savings/0`), value);
    window.alert("Savings updated!");
    setValue("");
  };

  return (
    <Box m="20px">
      <Header
        title="SAVING"
        subtitle="Change how much monies we have! 🪙🪙🪙"
      />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box>
          <Box mb={2}>Current Savings: {"$" + displayValue}</Box>
          <Box mb={2}>
          <TextField
            label="Update Value"
            value={value}
            onChange={handleChange}
          />
          </Box>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={handleClick}
            style={{
              width: "200px",
              borderRadius: "25px",
              backgroundColor: colors.greenAccent[400],
            }}
          >
            {<AddIcon />}
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditSavings;
