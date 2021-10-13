import { Box, Button, Container, Grid, Stack, TextField } from "@mui/material";
import React, { FC } from "react";
import useStyles from "./style";

// import useStyles from "./styles";

export const QuickFilter: FC<any> = (props) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Box className={classes.filterWrapper}>
        <Grid container spacing={2} p={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Message ID"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Customer ID"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Customer Mobile Number"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Customer Email Address"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Message Sent Start Date Range"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Message Sent End Date Range"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} justifyContent="end" direction="row">
              <Button variant="contained">Reset</Button>
              <Button variant="outlined">Apply</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
