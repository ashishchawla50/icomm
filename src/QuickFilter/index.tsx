import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import React, { FC, useEffect } from "react";
import TextInput from "../TextInput";
import useStyles from "./style";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink, CSVDownload } from "react-csv";
import * as api from "./api";

export const QuickFilter: FC<any> = (props) => {
  const classes = useStyles();
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [messageID, setMessageID] = React.useState("");
  const [customerID, setCustomerID] = React.useState("");

  const [customerMobile, setCustomerMobile] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [messageData, setMessaageData] = React.useState<any>();
  const [messageDataOriginal, setMessaageDataOriginal] = React.useState<any>();
  const DOWNLOAD_HEADERS = [["NAME", "MESSAGE"]];
  const DOWNLOAD_DATA = [
    { name: "Keanu Reeves", msg: "Actor" },
    { name: "Lionel Messi", msg: "Football Player" },
    { name: "Cristiano Ronaldo", msg: "Football Player" },
    { name: "Jack Nicklaus", msg: "Golf Player" },
  ];
  const handleStartDateChange = (newValue: any) => {
    setSelectedStartDate(newValue);
  };
  const handleEndDateChange = (newValue: any) => {
    setSelectedEndDate(newValue);
  };

  const [filter, setFilter] = React.useState<any>({
    messageID: {
      value: "",
      error: false,
    },
    custID: {
      value: "",
      error: false,
    },
    custMobile: {
      value: "",
      error: false,
    },
    custEmail: {
      value: "",
      error: false,
    },
  });

  const onMessageChangeHandler = (field: string, value: any) => {
    setMessageID(value);
  };
  const onCustIDChangeHandler = (field: string, value: any) => {
    setCustomerID(value);
  };
  const onCustMobileChangeHandler = (field: string, value: any) => {
    setCustomerMobile(value);
  };
  const onCustEmailChangeHandler = (field: string, value: any) => {
    setCustomerEmail(value);
  };
  const isAllFieldsValid = () => {
    if (
      messageID.length == 10 &&
      customerID.length == 12 &&
      customerMobile.length == 10 &&
      EMAIL_REGEX.test(customerEmail)
    ) {
      return true;
    }
    return false;
  };
  // const onChangeHandler = (field: string, value: any) => {
  //   console.log(field, filter);
  //   //setMessageID(value);
  //   if (filter && filter[field]) {
  //     filter[field].value = value;
  //   }
  //   validateFields(field);
  // };
  // const validateFields = (field: any) => {
  //   switch (field) {
  //     case "messageID":
  //       filter[field].value.length == 10
  //         ? (filter[field].error = false)
  //         : (filter[field].error = true);
  //       break;
  //     case "custID":
  //       filter[field].value.length == 12
  //         ? (filter[field].error = false)
  //         : (filter[field].error = true);
  //       break;

  //     default:
  //       return false;
  //   }
  // };
  // const isMessageIDValid = () => {
  //   if (messageID.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const handleExportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Download Messages";

    const data = DOWNLOAD_DATA.map((elt: any) => [elt.name, elt.msg]);

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
    let tempMessageData = [...messageDataOriginal];
    if (messageID.length) {
      tempMessageData = tempMessageData.filter((e: any) =>
        e.message_id.includes(messageID)
      );
    }
    if (customerID.length) {
      tempMessageData = tempMessageData.filter((e: any) =>
        e.customer_id.includes(customerID)
      );
    }
    if (customerMobile.length) {
      tempMessageData = tempMessageData.filter((e: any) =>
        e.customer_mobile_number.toString().includes(customerMobile)
      );
    }
    if (customerEmail.length) {
      tempMessageData = tempMessageData.filter((e: any) =>
        e.customer_email_address.includes(customerEmail)
      );
    }
    setMessaageData(tempMessageData);
    props.handleFilteredData(tempMessageData);
    //console.log(tempMessageData);
  };
  return (
    <>
      <Container maxWidth="md">
        <Box className={classes.filterWrapper}>
          <Grid container spacing={2} p={2}>
            <Grid item xs={6} pb={3}>
              {/* <TextField
              id="outlined-basic"
              label="Message ID"
              variant="outlined"
              fullWidth
            /> */}
              <TextInput
                dataField="messageID"
                label={"Message ID *"}
                placeholder={"Enter Message ID"}
                onEnter={onMessageChangeHandler}
                savedValue={""}
                data-testid="messsage-id-text"
              />
              {/* <Box className={classes.errorSpace}>
                {messageID.length && messageID.length !== 10 ? (
                  <small className="error">
                    Message ID is length should be 10
                  </small>
                ) : null}
              </Box> */}
            </Grid>
            <Grid item xs={6} pb={3}>
              <TextInput
                dataField="custID"
                label={"Customer ID"}
                placeholder={"Enter Customer ID"}
                onEnter={onCustIDChangeHandler}
                savedValue={""}
                data-testid="customer-id-text"
              />
              {/* <Box className={classes.errorSpace}>
                {customerID.length && customerID.length !== 12 ? (
                  <small className="error">
                    Customer ID is length should be 12
                  </small>
                ) : null}
              </Box> */}
            </Grid>
            <Grid item xs={6} pb={3}>
              <TextInput
                dataField="custMobile"
                label={"Customer Mobile Number"}
                placeholder={"Enter Customer Mobile Number"}
                onEnter={onCustMobileChangeHandler}
                savedValue={""}
                data-testid="customer-mobile-number-text"
              />
              {/* <Box className={classes.errorSpace}>
                {customerMobile.length && customerMobile.length !== 10 ? (
                  <small className="error">
                    Customer Mobile is length should be 10
                  </small>
                ) : null}
              </Box> */}
            </Grid>
            <Grid item xs={6} pb={3}>
              <TextInput
                dataField="custEmail"
                label={"Customer Email Address"}
                placeholder={"Enter Customer Email Address"}
                onEnter={onCustEmailChangeHandler}
                savedValue={""}
                data-testid="customer-email-id-text"
              />
              {/* <Box className={classes.errorSpace}>
                {customerEmail.length && !EMAIL_REGEX.test(customerEmail) ? (
                  <small className="error">Customer Email is invalid</small>
                ) : null}
              </Box> */}
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
                      messageID.length > 0 ||
                      customerID.length > 0 ||
                      customerMobile.length > 0 ||
                      customerEmail.length > 0
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
              <CSVLink data={DOWNLOAD_DATA}>Export to Excel </CSVLink>
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
