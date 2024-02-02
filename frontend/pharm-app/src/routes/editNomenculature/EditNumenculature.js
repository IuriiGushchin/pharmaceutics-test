import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditNumenculatureForm from "./EditNumenculatureForm";
import Copyright from "../../globalElements/Copyrights";
import axios from "axios";
import { SERVER_REQUESTS, PORT } from "../../helpers/constants";

export default function EditNomenculature() {
  const [nomenculature, setNomenculature] = React.useState(null);
  const [consignment, setConsignment] = React.useState(null);

  const queryParameters = new URLSearchParams(window.location.search);
  const nomenculatureId = queryParameters.get("nomenculatureId");
  const consignmentId = queryParameters.get("consignmentId");

  React.useEffect(() => {
    axios
      .all([
        axios.get(
          `http://localhost:${PORT}${SERVER_REQUESTS.nomenculatures}/${nomenculatureId}`
        ),
        axios.get(`http://localhost:${PORT}${SERVER_REQUESTS.consignment}`, {
          params: { id: consignmentId },
        }),
      ])
      .then(
        axios.spread((response1, response2) => {
          setNomenculature(response1.data);
          setConsignment(response2.data);
        })
      );
  }, [nomenculatureId, consignmentId]);

  return (
    <React.Fragment>
      <Container component="main" maxWidth="100%" sx={{ mb: 10 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
            {`Правка ${nomenculature?.nomenculatureName}`}
          </Typography>
          <EditNumenculatureForm
            initNomenculature={nomenculature}
            initConsignment={consignment}
          />
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
