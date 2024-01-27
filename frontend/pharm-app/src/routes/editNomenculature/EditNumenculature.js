import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EditNumenculatureForm from "./EditNumenculatureForm";

import axios from 'axios';
import { SEVER_REQUESTS, PORT } from '../../helpers/constants';



//TODO: обновить значения на странице после изменений в номенкулатуре
export default function EditNomenculature() {
  const [nomenculature, setNomenculature] = React.useState("")

  const queryParameters = new URLSearchParams(window.location.search)
  const nomenculatureId = queryParameters.get("nomenculatureId")

  React.useEffect(() => {
    axios.get(`http://localhost:${PORT}${SEVER_REQUESTS.nomenculatures}/${nomenculatureId}`).then((response) => {
      setNomenculature(response.data);
    });
  }, [nomenculatureId]);

  
  return (
    <React.Fragment>
      <Container component="main" maxWidth="100%" sx={{ mb: 10 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 10, md: 10 }, p: { xs: 2, md: 10 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 4 }}>
            {`Правка ${nomenculature.nomenculatureName}`}
          </Typography>
          <EditNumenculatureForm nomenculature={nomenculature} />
        </Paper>
      </Container>
    </React.Fragment>
  );
}
