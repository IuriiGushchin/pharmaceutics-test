import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { v4 as uuidv4 } from "uuid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

const initialNomenculature = {
  numenculatureCode: "",
  numenculatureName: "",
  consignmentId: "",
  consignmentNumber: 0,
  series: "",
  manufacturer: "",
  bestBeforeDate: "",
  receiptDate: "",
  count: 0,
};

// "" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
// "" int4,
// "" varchar(255) COLLATE "pg_catalog"."default",
// "" varchar(255) COLLATE "pg_catalog"."default",
// "" date,
// "" date,
// "count

export default function CreateNomenculatureForm() {
  const [consCount, setConsCount] = React.useState(0);
  const [consIds, setConsIds] = React.useState([]);
  const [nomenculature, setNomenculature] =
    React.useState(initialNomenculature);

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

  return (
    <React.Fragment>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12}>
          <TextField
            required
            id="nomId"
            name="nomId"
            label="Номер нуменкулатуры"
            fullWidth
            autoComplete="given-name"
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
            label="Название номенкулатуры"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            sx={{ mb: 1 }}
            onChange={(event) =>
              setNomenculature({
                ...nomenculature,
                nomenculatureName: event.target.value,
              })
            }
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          sx={{
            backgroundColor: "#fbfaff",
            border: 1,
            borderRadius: 3,
            ml: 2,
          }}>
          <Grid item xs={12} sx={{ mt: -3 }}>
            <TextField
              required
              id="consId"
              name="consId"
              label="Номер партии"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              sx={{ width: "95%" }}
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  consignmentNumber: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="series"
              name="series"
              label="Серия"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              sx={{ width: "95%" }}
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  series: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="manufacturer"
              name="manufacturer"
              label="Производитель"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              sx={{ width: "95%" }}
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  manufacturer: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="bestBeforeDate"
              name="bestBeforeDate"
              label="Срок годности"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              sx={{ width: "95%" }}
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  bestBeforeDate: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="receiptDate"
              name="receiptDate"
              label="Дата прихода"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              sx={{ width: "95%" }}
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  receiptDate: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="count"
              name="count"
              label="Остаток"
              sx={{ mb: 3, width: "95%" }}
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(event) =>
                setNomenculature({
                  ...nomenculature,
                  count: event.target.value,
                })
              }
            />
          </Grid>
        </Grid>
        {consCount > 0 &&
          consIds.map((consId) => (
            <Grid key={consId} container item spacing={3}>
              <Grid
                item
                container
                xs={12}
                sx={{
                  backgroundColor: "#fbfaff",
                  border: 1,
                  borderRadius: 3,
                  ml: 2,
                  mt: 2,
                }}>
                <Grid item xs={12} sx={{ mt: -4 }}>
                  <TextField
                    required
                    id="consId"
                    name="consId"
                    label="Номер партии"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    sx={{ mt: 2 }}
                    onChange={(event) =>
                      setNomenculature({
                        ...nomenculature,
                        consignmentNumber: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="series"
                    name="series"
                    label="Серия"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(event) =>
                      setNomenculature({
                        ...nomenculature,
                        series: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="manufacturer"
                    name="manufacturer"
                    label="Производитель"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(event) =>
                      setNomenculature({
                        ...nomenculature,
                        manufacturer: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="bestBeforeDate"
                    name="bestBeforeDate"
                    label="Срок годности"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(event) =>
                      setNomenculature({
                        ...nomenculature,
                        bestBeforeDate: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="receiptDate"
                    name="receiptDate"
                    label="Дата прихода"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    onChange={(event) =>
                      setNomenculature({
                        ...nomenculature,
                        receiptDate: event.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="count"
                    name="count"
                    label="Остаток"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    sx={{ mb: 3 }}
                    onChange={(event) =>
                      setNomenculature({
                        ...nomenculature,
                        count: event.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<RemoveIcon />}
                  onClick={(e) => handleDelete(consId)}
                  xs={2}>
                  {`Удалить дополнительную партию `}
                </Button>
              </Grid>
            </Grid>
          ))}
        <Grid item>
          <Button startIcon={<AddIcon />} onClick={handleNext}>
            Добавить партию
          </Button>
        </Grid>
        <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
          Создать
        </Button>
      </Grid>
    </React.Fragment>
  );
}
