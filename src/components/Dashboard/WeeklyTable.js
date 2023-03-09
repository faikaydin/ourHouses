import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import moment from 'moment'
import { groupBy } from 'lodash'
import RealTimeData from '../realTimeData'

const WeeklyTable = () => {
  const data = RealTimeData()

  const weeklyData = groupBy(data, (dt) =>
    moment(dt?.transaction_date).isoWeek()
  )

  const createData = (week, total) => {
    return { week, total }
  }
  const rows = () => {
    let rowsList = []
    for (const key in weeklyData) {
      let sum = 0
      for (const data in weeklyData[key]) {
        if (weeklyData[key][data].transaction_date.isAfter('2023-1-1'))
          sum = sum + +weeklyData[key][data].transaction_amount
      }
      if (sum > 0) {
        rowsList.push(createData(key, Math.round(sum)))
      }
    }
    return rowsList
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Week</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows().map((row) => (
            <TableRow
              key={row.week}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.week}
              </TableCell>

              <TableCell align="right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
  //groupBy(data, (dt) => moment(dt).week())
}
export default WeeklyTable
