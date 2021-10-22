import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getGridUtilityClass } from '@mui/material';



export default function DataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Message ID</TableCell>
            <TableCell align="right">Customer ID</TableCell>
            <TableCell align="right">Customer Mobile Number</TableCell>
            <TableCell align="right">Customer Email Address</TableCell>
            <TableCell align="right">Message Sent Start Date</TableCell>
            <TableCell align="right">Message Sent End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.message_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">
                {row.message_id}
              </TableCell>
              <TableCell align="right">{row.customer_id}</TableCell>
              <TableCell align="right">{row.customer_mobile_number}</TableCell>
              <TableCell align="right">{row.customer_email_address}</TableCell>
              <TableCell align="right">{row.message_sent_start_date}</TableCell>
              <TableCell align="right">{row.message_sent_end_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function createTable(
    message_id:string,
    customer_id: string,
    customer_mobile_number: number,
    customer_email_address: string,
    message_sent_start_date: string,
    message_sent_end_date: string,
  ) {
    return { message_id,customer_id, customer_mobile_number, customer_email_address, message_sent_start_date, message_sent_end_date };
  }
  
  const rows = [
    createTable('123456','123', 1000001, "xyz@xyz.com", "18-Oct-21", "25-Oct-21"),
    createTable('123456','1234', 1000001, "xyz@xyz.com", "18-Oct-21", "25-Oct-21"),
    createTable('123456','1432', 1000001, "xyz@xyz.com", "18-Oct-21", "25-Oct-21"),
    createTable('123456','1001', 1000001, "xyz@xyz.com","18-Oct-21", "25-Oct-21"),
    createTable('123456','1001', 100011, "xyz@xyz.com", "18-Oct-21", "25-Oct-21"),
  ];