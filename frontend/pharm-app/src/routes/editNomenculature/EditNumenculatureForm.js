import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import axios from "axios";
import { SERVER_REQUESTS, PORT } from "../../helpers/constants";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function EditNomenculatureForm(props) {
  let { initNomenculature, initConsignment } = props;

  const [nomenculature, setNomenculature] = React.useState(null);
  const [consignment, setConsignment] = React.useState(null);
  const [errors, setErrors] = React.useState(null);

  React.useEffect(() => {
    setNomenculature(initNomenculature)
    setConsignment(initConsignment)
  }, [initNomenculature, initConsignment])

  const handleEdit = () => {
    // check for emptiness
    for (var key in nomenculature) {
      if (nomenculature[key] === "") {
        nomenculature[key] = initNomenculature[key]
      }
    }
    for (var key in consignment) {
      if (consignment[key] === "") {
        consignment[key] = initConsignment[key]
      }
    }
    axios
      .all([
        axios.post(`http://localhost:${PORT}${SERVER_REQUESTS.nomenculatures}/${nomenculature.nomenculatureId}`,
              nomenculature
            ),
        axios.post(`http://localhost:${PORT}${SERVER_REQUESTS.consignment}/${consignment.consignmentId}`, {
          consignment
        }),
      ]).then(() => {
        if (!alert("Succied!")) {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e)
        alert(e.response.data.error.message)
      });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography component="h4" variant="h8" align="left">
            {`Код номенкулатуры: ${initNomenculature?.nomenculatureCode}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Название номенкулатуры: ${initNomenculature?.nomenculatureName}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Код партии: ${initConsignment?.consignmentCode}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Производитель: ${initConsignment?.manufacturer}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Серия: ${initConsignment?.series}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Дата прихода: ${initConsignment?.receiptDate.substring(
              0,
              initConsignment?.receiptDate.length - 14
            )}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Срок годности: ${initConsignment?.bestBeforeDate.substring(
              0,
              initConsignment?.bestBeforeDate.length - 14
            )}`}
          </Typography>
          <Typography component="h4" variant="h8" align="left">
            {`Количество: ${initConsignment?.count}`}
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
            onChange={(event) =>
              setNomenculature({
                ...nomenculature,
                nomenculatureCode: event.target.value,
              })
            }
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
            onChange={(event) =>
              setNomenculature({
                ...nomenculature,
                nomenculatureName: event.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h4" variant="h8" align="center">
            {`Партия:`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors && errors["consignmentNumber"]}
            helperText={errors && errors["consignmentNumber"]}
            required
            id="consId"
            name="consId"
            label="Номер партии"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            sx={{ width: "95%" }}
            onChange={(event) =>
              setConsignment({
                ...consignment,
                consignmentCode: event.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors && errors["series"]}
            helperText={errors && errors["series"]}
            required
            id="series"
            name="series"
            label="Серия"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            sx={{ width: "95%" }}
            onChange={(event) =>
              setConsignment({
                ...consignment,
                series: event.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors && errors["manufacturer"]}
            helperText={errors && errors["manufacturer"]}
            required
            id="manufacturer"
            name="manufacturer"
            label="Производитель"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            sx={{ width: "95%" }}
            onChange={(event) =>
              setConsignment({
                ...consignment,
                manufacturer: event.target.value,
              })
            }
          />
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]} sx={{ ml: "5%" }}>
                <DatePicker
                  label="Срок годности"
                  format="DD/MM/YYYY"
                  render
                  slotProps={{
                    textField: {
                      variant: "standard",
                      error: !!errors && !!errors["bestBeforeDate"],
                      helperText: errors && errors["bestBeforeDate"],
                    },

                    // helperText={errors && errors["manufacturer"]}
                  }}
                  sx={{ width: "95%", overflow: "hidden" }}
                  onChange={(value) => {
                    setConsignment({
                      ...consignment,
                      bestBeforeDate: value,
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DatePicker
                  label="Дата прихода"
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      variant: "standard",
                      error: !!errors && !!errors["receiptDate"],
                      helperText: errors && errors["receiptDate"],
                    },
                  }}
                  sx={{ width: "95%", overflow: "hidden" }}
                  onChange={(value) => {
                    console.log(value);
                    setConsignment({
                      ...consignment,
                      receiptDate: value,
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={errors && errors["count"]}
            helperText={errors && errors["count"]}
            required
            id="count"
            name="count"
            label="Остаток"
            sx={{ mb: 3, width: "95%" }}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(event) =>
              setConsignment({
                ...consignment,
                count: Number(event.target.value),
              })
            }
          />
        </Grid>
        <Grid item alignItems={"center"} xs={12} >
          <Button
            variant="contained"
            onClick={handleEdit}>
            Edit
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
