import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
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

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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
export default function DataTable(props: any) {
  const [page, setPage] = useState(0);
  const [tablevalue, setTablevalue] = useState<TableData>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('customer_id');

  useEffect(() => {
    axios.get<TableData>("http://localhost:3000/data").then((response) => {
      setTablevalue(response.data);
    });
  }, []);
  useEffect(() => {
    setTablevalue(props.messageData || []);
  }, [props.messageData]);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tablevalue.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            
          >
      
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
              {stableSort(tablevalue, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow>
                      <TableCell align="right">{row.message_id}</TableCell>
              <TableCell align="right">{row.customer_id}</TableCell>
              <TableCell align="right">{row.customer_mobile_number}</TableCell>
              <TableCell align="right">{row.customer_email_address}</TableCell>
              <TableCell align="right">{row.message_sent_start_date}</TableCell>
              <TableCell align="right">{row.message_sent_end_date}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: ( 33 ) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tablevalue.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </Box>
  );
}
interface Data {
    message_id: string;
  customer_id: string;
  customer_mobile_number: number;
  customer_email_address: string;
  message_sent_start_date: string;
  message_sent_end_date: string;
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
  