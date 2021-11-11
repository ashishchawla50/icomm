import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect,useRef } from "react";
import axios from "axios";



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function TableDetails(props: any) {
  
  const [tablevalue, setTablevalue] = useState<TableData>([]);
  
  useEffect(() => {
    axios.get<TableData>('http://localhost:3000/data/').then((response) => {
      setTablevalue(response.data);
    });
  }, []);
  

 
  return (
    <Box sx={{ width: "100%" }}>
      
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
              {tablevalue
                .map((row, i) => {
               

                  return (
                    <TableRow>
                      <TableCell align="right">{row.message_id}</TableCell>
                      <TableCell align="right">{row.message_id}</TableCell>
                      <TableCell align="right">{row.customer_id}</TableCell>
                      <TableCell align="right">
                        {row.customer_mobile_number}
                      </TableCell>
                      <TableCell align="right">
                        {row.customer_email_address}
                      </TableCell>
                      <TableCell align="right">
                        {row.message_sent_start_date}
                      </TableCell>
                      <TableCell align="right">
                        {row.message_sent_end_date}
                      </TableCell>
                      
                    </TableRow>
                  );
                })}
            
            </TableBody>
          </Table>
        </TableContainer>
       
    </Box>
  );
}


interface createTable {
  id:number,
  message_id: string;
  customer_id: string;
  customer_mobile_number: number;
  customer_email_address: string;
  message_sent_start_date: string;
  message_sent_end_date: string;
}
export type TableData = createTable[];
