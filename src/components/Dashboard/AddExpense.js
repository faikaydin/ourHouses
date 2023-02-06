import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  Box,
  Select,
  Typography,
  useTheme,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TextField, Button } from "@mui/material";
import { getDatabase, ref, push } from "firebase/database";
import app from "../../firebase";
import Header from "../Header";
import { tokens } from "../../theme";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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

const expenseTypeCategories = [
  { value: "in", label: "Money IN" },
  { value: "out", label: "Money OUT" },
];

function AddExpense() {
  const [formData, setFormData] = useState({
    transaction_amount: "",
    transaction_category: "",
    transaction_date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    transaction_item: "",
    transaction_type: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const fields = [
    "transaction_amount",
    "transaction_category",
    "transaction_date",
    "transaction_item",
    "transaction_type",
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFormData({
      ...formData,
      transaction_date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isNaN(formData.transaction_amount)) {
      alert("Amount must be a valid integer");
    } else if (!fields.every((field) => formData[field])) {
      alert("fill all fields");
    } else {
      push(ref(getDatabase(app), `expenses`), formData)
        .then(() => {
          setFormData({
            transaction_amount: "",
            transaction_category: "",
            transaction_date: new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            transaction_item: "",
            transaction_type: "",
          });
          alert("Expense Submitted!");
        })
        .catch((error) => {
          console.error(error);
          alert("There is a problem!");
        });
    }
  };

  return (
    <Box m="20px">
      <Header
        title="EXPNESES"
        subtitle="Noooooo Our Moneeeeey 💸💸💸"
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
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              name="transaction_amount"
              label="Amount"
              value={formData.transaction_amount}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="cat-label">Category</InputLabel>
              <Select
                name="transaction_category"
                labelId="cat-label"
                placeholder="Category"
                label="Category"
                value={formData.transaction_category}
                onChange={handleChange}
                fullWidth
              >
                {expenseCategories.map((expenseCategories) => (
                  <MenuItem
                    key={expenseCategories.value}
                    value={expenseCategories.value}
                  >
                    {expenseCategories.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  name="transaction_date"
                  inputFormat="dd/MM/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
          <Box mb={2}>
            <TextField
              name="transaction_item"
              label="Item"
              value={formData.transaction_item}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                name="transaction_type"
                labelId="type-label"
                placeholder="Type"
                label="Type"
                value={formData.transaction_type}
                onChange={handleChange}
                fullWidth
              >
                {expenseTypeCategories.map((expenseTypeCategories) => (
                  <MenuItem
                    key={expenseTypeCategories.value}
                    value={expenseTypeCategories.value}
                  >
                    {expenseTypeCategories.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            mb={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                width: "200px",
                borderRadius: "25px",
                backgroundColor: colors.greenAccent[400],
              }}
            >
              {<AddIcon />} Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default AddExpense;
