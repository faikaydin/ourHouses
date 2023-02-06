import React, { useEffect, useState } from "react";
import { expenseRef } from "../data/databaseFirebase";
import { onValue } from "firebase/database";
import moment from "moment";

const RealTimeData = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    onValue(expenseRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyname = childSnapshot.key;
        let data = childSnapshot.val();
        data.transaction_date = moment(data.transaction_date, "DD/MM/YYYY")
        data.id = keyname;
        records.push(data);
      });
      setTableData(records)
    });
  }, []);
  return tableData
};

export default RealTimeData