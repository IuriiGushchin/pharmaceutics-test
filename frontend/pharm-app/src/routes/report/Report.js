import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import CreateNomenculatureForm from "./CreateNomenculatureForm";
import Copyright from "../../globalElements/Copyrights";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { SERVER_REQUESTS, PORT } from "../../helpers/constants";
import axios from "axios";

export default function Report() {
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();

  const handleCreate = () => {
    console.log(startDate, endDate);

    axios
      .post(
        `http://localhost:${PORT}${SERVER_REQUESTS.report}/`,
        {startDate, endDate}
      )
      .then((result) => {
        console.log(result)
      });
  };

  return (
    <React.Fragment>
      <Container component="main">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 } }}>
          <Typography component="h1" variant="h4" align="center">
            Отчет
          </Typography>
          <Grid
            container
            spacing={3}
            flexDirection={"row"}
            // xs={12}
            justifyContent={"center"}>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    name="startDate"
                    label="Начальная дата"
                    render
                    slotProps={{
                      textField: {
                        variant: "standard",
                        // error: !!errors && !!errors["bestBeforeDate"],
                        // helperText: errors && errors["bestBeforeDate"],
                      },
                    }}
                    sx={{ width: "100%" }}
                    onChange={(value) => {
                      setStartDate(value);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    name="endDate"
                    label="Конечная дата"
                    render
                    slotProps={{
                      textField: {
                        variant: "standard",
                        // error: !!errors && !!errors["receiptDate"],
                        // helperText: errors && errors["receiptDate"],
                      },
                    }}
                    sx={{ width: "100%" }}
                    onChange={(value) => {
                      setEndDate(value);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{ mt: 3, ml: 1 }}>
            Next
          </Button>
          {/* <CreateNomenculatureForm /> */}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
