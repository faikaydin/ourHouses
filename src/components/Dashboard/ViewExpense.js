import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import RealTimeData from "../realTimeData";
import Header from "../Header";
import React, { useEffect, useRef, useState } from "react";
import { Delete, Edit, Save } from "@mui/icons-material";
import { getDatabase, ref, remove, set } from "firebase/database";
import app from "../../firebase";
import moment from "moment";

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

const Team = () => {
  let ourHousesdata = RealTimeData();
  const [rowEdit, setRowEdit] = useState({});
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "transaction_date",
      headerName: "Date",
      type: "date",
      flex: 1,
      align: "left",
      editable: true,
    },

    {
      field: "transaction_item",
      headerName: "Item",
      type: "string",
      flex: 1,
      align: "left",
      editable: true,
    },

    {
      field: "transaction_category",
      headerName: "Category",
      type: "singleSelect",
      valueOptions: expenseCategories,
      headerAlign: "left",
      editable: true,
    },

    {
      field: "transaction_amount",
      headerName: "Cost",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "transaction_type",
      headerName: "Type",
      type: "singleSelect",
      valueOptions: expenseTypeCategories,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      headerAlign: "left",
      getActions: (params) => {
        if (rowEdit[params.id]) {
          return [
            <GridActionsCellItem
              icon={<Delete />}
              onClick={() =>
                remove(ref(getDatabase(app), `expenses/${params.id}`))
              }
              label="Delete Expense"
            />,

            <GridActionsCellItem
              icon={<Save />}
              onClick={(event) => {
                {
                  event.preventDefault();
                }

                {
                  set(ref(getDatabase(app), `expenses/${params.id}`), {
                    transaction_amount: params.row.transaction_amount,
                    transaction_category: params.row.transaction_category,
                    transaction_date: moment(params.row.transaction_date)
                      .format("DD-MM-YYYY")
                      .toString(),
                    transaction_item: params.row.transaction_item,
                    transaction_type: params.row.transaction_type,
                  });
                }
                {
                  setRowEdit((peviousState) => ({
                    ...peviousState,
                    [params.id]: false,
                  }));
                }
              }}
              label="Edit Expense"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Delete />}
            onClick={() =>
              remove(ref(getDatabase(app), `expenses/${params.id}`))
            }
            label="Delete Expense"
          />,
        ];
      },
    },
  ];

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
        <DataGrid
          rows={ourHousesdata}
          columns={columns}
          onCellClick={(params, event) => {
            // event.defaultMuiPrevented = true;
            // console.log(isRowEdited[params.id]);
            // console.log(params.row);
          }}
          onRowClick={(params, event) => {
            {
              {
                setRowEdit((peviousState) => ({
                  ...peviousState,
                  [params.id]: true,
                }));
              }

              {
                console.log(rowEdit);
              }
            }
          }}
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            sorting: {
              sortModel: [{ field: "transaction_date", sort: "desc" }],
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Team;
