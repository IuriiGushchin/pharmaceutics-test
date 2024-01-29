import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import DocumentForm from "./CreateDocumentForm";
import Copyright from "../../globalElements/Copyrights";


export default function CreateDocument() {
  return (
    <React.Fragment>
      <Container component="main" maxWidth="xl">
        <Paper
          variant="outlined"
          sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 }}}>
          <Typography component="h1" variant="h4" align="center" >
            {`Документ`}
          </Typography>
          <DocumentForm document={document} />
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
