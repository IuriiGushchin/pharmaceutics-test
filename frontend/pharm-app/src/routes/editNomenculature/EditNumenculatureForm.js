import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";

import axios from "axios";
import { SERVER_REQUESTS, PORT } from "../../helpers/constants";


//TODO: проверить на грамотность 
export default function EditNomenculatureForm(props) {
  let { nomenculature } = props;

  const [consCount, setConsCount] = React.useState(0);
  const [consIds, setConsIds] = React.useState([]);
  const [nomenculatureName, setNomenculatureName] = React.useState("");
  const [nomenculatureCode, setNomenculatureCode] = React.useState("");
  const [consignmentId, setConsignmentId] = React.useState("");

  console.log(nomenculature);

  const handleNext = () => {
    const tempIds = consIds;
    tempIds.push(uuidv4());
    setConsIds(tempIds);
    setConsCount(consCount + 1);
  };

  const handleDelete = (id) => {
    const tempIds = consIds.filter(function (item) {
      return item !== id;
    });
    setConsIds(tempIds);
    setConsCount(consCount - 1);
  };

  const handleEdit = () => {
    if (nomenculatureName !== "") {
      console.log(nomenculatureName);
      nomenculature.nomenculatureName = nomenculatureName;
    }
    if (nomenculatureCode !== "") {
      console.log(nomenculatureCode);
      nomenculature.nomenculatureCode = nomenculatureCode;
    }
    if (consignmentId !== "") {
      console.log(consignmentId);
      nomenculature.consignmentId = consignmentId;
    }

    // zapros
    axios
      .post(
        `http://localhost:${PORT}${SERVER_REQUESTS.nomenculatures}/${nomenculature.nomenculatureId}`,
        nomenculature
      )
      .then((response) => {
        if(!alert('Succied!')){window.location.reload();}
      });

    console.log(nomenculature);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography component="h4" variant="h8" align="left">
            {`Код номенкулатуры: ${nomenculature.nomenculatureCode}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Название номенкулатуры: ${nomenculature.nomenculatureName}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Номер партии: ${nomenculature.consignmentId}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="nomCode"
            name="noCode"
            label={`Изменить код номенкулатуры: `}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(event) => setNomenculatureCode(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="nomName"
            name="nomName"
            label={`Изменить название номенкулатуры: `}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(event) => setNomenculatureName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="consId"
            name="consId"
            label={`Изменить номер партии: `}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(event) => setConsignmentId(event.target.value)}
          />
        </Grid>
        {consCount > 0 &&
          consIds.map((consId) => (
            <Grid key={consId} container item spacing={3}>
              <Grid item xs={10}>
                <TextField
                  required
                  id={consId}
                  name={consId}
                  label="Добавить партию"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <RemoveIcon onClick={(e) => handleDelete(consId)} xs={2} />
              </Grid>
            </Grid>
          ))}
        <Grid item>
          <AddIcon onClick={handleNext} />
        </Grid>

        <Button variant="contained" onClick={handleEdit} sx={{ mt: 3, ml: 1 }}>
          Edit
        </Button>
      </Grid>
    </React.Fragment>
  );
}
