import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DataTable(props: any) {
  const [tablevalue, setTablevalue] = useState<TableData>([]);

  useEffect(() => {
    axios.get<TableData>("http://localhost:3000/data").then((response) => {
      setTablevalue(response.data);
    });
  }, []);

  useEffect(() => {
    setTablevalue(props.messageData || []);
  }, [props.messageData]);
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
          {tablevalue.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right">{row.message_id}</TableCell>
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
interface createTable {
  message_id: string;
  customer_id: string;
  customer_mobile_number: number;
  customer_email_address: string;
  message_sent_start_date: string;
  message_sent_end_date: string;
}
export type TableData = createTable[];
