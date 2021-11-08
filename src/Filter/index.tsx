import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { FC, useEffect } from "react";
import TextInput from "../TextInput";
import useStyles from "./style";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink, CSVDownload } from "react-csv";
import * as api from "./api";

export const Filter: FC<any> = (props) => {
  const classes = useStyles();
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [messageData, setMessaageData] = React.useState<any>();
  const [messageDataOriginal, setMessaageDataOriginal] = React.useState<any>();
  const [referesh, setReferesh] = React.useState(false);

  const messageIDRef: any = React.useRef();
  const customerIDRef: any = React.useRef();
  const customerMobileRef: any = React.useRef();
  const customerEmailRef: any = React.useRef();

  const DOWNLOAD_HEADERS = [
    [
      "Message ID",
      "Customer Id",
      "Customer mobile number",
      "Customer Email",
      "Message Start Date",
      "Message End Date",
    ],
  ];
  const DOWNLOAD_HEADERS_EXCEL = [
    { label: "Message ID", key: "message_id" },
    { label: "Customer ID", key: "customer_id" },
    { label: "Customer mobile number", key: "customer_mobile_number" },
    { label: "Customer Email", key: "customer_email_address" },
    { label: "Message Start Date", key: "message_sent_start_date" },
    { label: "Message End Date", key: "message_sent_end_date" },
  ];

  const handleStartDateChange = (newValue: any) => {
    setSelectedStartDate(newValue);
  };
  const handleEndDateChange = (newValue: any) => {
    setSelectedEndDate(newValue);
  };

  const handleExportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Download Messages";

    const data = messageData?.map((elt: any) => [
      elt.message_id,
      elt.customer_id,
      elt.customer_mobile_number,
      elt.customer_email_address,
      elt.message_sent_start_date,
      elt.message_sent_end_date,
    ]);

    let content = {
      startY: 50,
      head: DOWNLOAD_HEADERS,
      body: data,
    };

    //doc.text(title, marginLeft, 40);
    //doc.autoTable(content);
    autoTable(doc, {
      head: DOWNLOAD_HEADERS,
      body: data,
      didDrawPage: (dataArg) => {
        doc.text(title, dataArg.settings.margin.left, 20);
      },
    });
    doc.save("messages.pdf");
  };

  useEffect(() => {
    api.getMessageData().then((response: any) => {
      setMessaageData(response.data);
      setMessaageDataOriginal(response.data);
    });
  }, []);

  const handleApply = () => {
    console.log(messageIDRef);
    let tempMessageData = [...messageDataOriginal];

    if (messageIDRef?.current?.value?.length) {
      tempMessageData = tempMessageData.filter((e: any) =>
        e.message_id.includes(messageIDRef?.current?.value)
      );
    }
    if (customerIDRef?.current?.value?.length) {
      tempMessageData = tempMessageData.filter((e: any) =>
        e.customer_id.includes(customerIDRef?.current?.value)
      );
    }
    if (customerMobileRef?.current?.value?.length) {
      tempMessageData = tempMessageData.filter((e: any) =>
        e.customer_mobile_number
          .toString()
          .includes(customerMobileRef?.current?.value)
      );
    }
    if (customerEmailRef?.current?.value?.length) {
      tempMessageData = tempMessageData.filter((e: any) =>
        e.customer_email_address.includes(customerEmailRef?.current?.value)
      );
    }
    setMessaageData(tempMessageData);
    props.handleFilteredData(
      tempMessageData,
      icommCheck ? "0" : "1",
      icommCheck ? dataDropDown : "0"
    );
    //console.log(tempMessageData);
  };
  const [dataDropDown, setDataDropDown] = React.useState("1");
  const [icommCheck, setIcommCheck] = React.useState(true);
  const [icomm2Check, setIcomm2Check] = React.useState(false);
  const handleChange = (event: any) => {
    setDataDropDown(event.target.value);
  };

  return (
    <>
      <Container maxWidth="md">
        <Box className={classes.filterWrapper}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={3} pb={3}>
              <FormGroup className={classes.checkBox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      checked={icommCheck}
                      onClick={() => {
                        setIcomm2Check(false);
                        setIcommCheck(true);
                      }}
                    />
                  }
                  label="iComm"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={3} pb={3}>
              <FormGroup className={classes.checkBox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={icomm2Check}
                      onClick={() => {
                        setIcommCheck(false);
                        setIcomm2Check(true);
                      }}
                    />
                  }
                  label="PNS Logs"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={6} pb={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {icommCheck ? "IComm" : "PNS Logs"}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dataDropDown}
                  label={icommCheck ? "IComm" : "PNS Logs"}
                  onChange={handleChange}
                  disabled={!icommCheck}
                  className={classes.selectBox}
                >
                  <MenuItem value={0}>SMS</MenuItem>
                  <MenuItem value={1}>{icommCheck ? "Email" : "SMS"}</MenuItem>
                  <MenuItem value={2}>Push </MenuItem>
                  <MenuItem value={3}>Inbox </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} pb={3}>
              <TextField
                fullWidth
                type="text"
                label={"Message ID"}
                placeholder={"Enter Message ID"}
                inputProps={{ maxLength: 10 }}
                inputRef={messageIDRef}
                onBlur={() => {
                  setReferesh(!referesh);
                }}
              />
              <Box className={classes.errorSpace}>
                {messageIDRef?.current?.value?.length &&
                messageIDRef?.current?.value?.length !== 10 ? (
                  <small className="error">
                    Message ID is length should be 10
                  </small>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={6} pb={3}>
              <TextField
                fullWidth
                type="text"
                label={"Customer ID"}
                placeholder={"Enter Customer ID"}
                inputProps={{ maxLength: 12 }}
                inputRef={customerIDRef}
                onBlur={() => {
                  setReferesh(!referesh);
                }}
              />
              <Box className={classes.errorSpace}>
                {customerIDRef?.current?.value?.length &&
                customerIDRef?.current?.value?.length !== 12 ? (
                  <small className="error">
                    Customer ID is length should be 12
                  </small>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={6} pb={3}>
              <TextField
                fullWidth
                type="text"
                label={"Customer Mobile Number"}
                placeholder={"Enter Customer Mobile Number"}
                inputProps={{ maxLength: 10 }}
                inputRef={customerMobileRef}
                onBlur={() => {
                  setReferesh(!referesh);
                }}
              />
              <Box className={classes.errorSpace}>
                {customerMobileRef?.current?.value?.length &&
                customerMobileRef?.current?.value?.length !== 10 ? (
                  <small className="error">
                    Customer Mobile is length should be 10
                  </small>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={6} pb={3}>
              <TextField
                fullWidth
                type="email"
                label={"Customer Email Address"}
                placeholder={"Enter Customer Email Address"}
                inputRef={customerEmailRef}
                onBlur={() => {
                  setReferesh(!referesh);
                }}
              />
              <Box className={classes.errorSpace}>
                {customerEmailRef?.current?.value?.length &&
                !EMAIL_REGEX.test(customerEmailRef?.current?.value) ? (
                  <small className="error">Customer Email is invalid</small>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box className={classes.datePicker}>
                  <DateTimePicker
                    label="Message Sent Start Date Range"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} pb={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box className={classes.datePicker}>
                  <DateTimePicker
                    label="Message Sent End Date Range"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    renderInput={(params: any) => <TextField {...params} />}
                  />
                </Box>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} pb={1}>
              <Stack spacing={2} justifyContent="end" direction="row">
                <Button variant="contained">Reset</Button>
                <Button
                  variant="outlined"
                  onClick={handleApply}
                  disabled={
                    !(
                      messageIDRef?.current?.value?.length > 0 ||
                      customerIDRef?.current?.value?.length > 0 ||
                      customerMobileRef?.current?.value?.length > 0 ||
                      customerEmailRef?.current?.value?.length > 0
                    )
                  }
                >
                  Apply
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} pb={1}>
          <Stack spacing={2} justifyContent="end" direction="row">
            <Button variant="outlined">
              <CSVLink
                headers={DOWNLOAD_HEADERS_EXCEL}
                data={messageData?.length ? messageData : []}
              >
                Export to Excel
              </CSVLink>
            </Button>
            <Button variant="contained" onClick={handleExportPDF}>
              Export to PDF
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
