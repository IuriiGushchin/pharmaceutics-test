import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import CreateNomenculatureForm from "./CreateNomenculatureForm";
import Copyright from "../../globalElements/Copyrights";

export default function Report() {

  return (
    <React.Fragment>
      <Container component="main">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 } }}>
          <Typography component="h1" variant="h4" align="center">
            Отчет
          </Typography>
          {/* <CreateNomenculatureForm /> */}
        </Paper>
        <Copyright/>
      </Container>
    </React.Fragment>
  );
}
