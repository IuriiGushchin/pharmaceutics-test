import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import ForwardIcon from '@mui/icons-material/Forward';
import { visuallyHidden } from "@mui/utils";
import { ROUTES_LIST } from '../../helpers/constants';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "nomenculatureId",
    numeric: false,
    disablePadding: true,
    label: "ID номенкулатура",
  },
  {
    id: "nomenculatureCode",
    numeric: true,
    disablePadding: false,
    label: "Код номенкулатуры",
  },
  {
    id: "nomenculatureName",
    numeric: true,
    disablePadding: false,
    label: "Название номенкулатуры",
  },
  {
    id: "consignmentId",
    numeric: true,
    disablePadding: false,
    label: "ID прихода",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, numSelected, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { selectedItemName, selected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedItemName !== null && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}>
      {selectedItemName !== null ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div">
          {`Правка "${selectedItemName}"`}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div">
          Номенкулатуры
        </Typography>
      )}

      {selectedItemName ? (
        <Tooltip title="Edit">
          <IconButton href={`${ROUTES_LIST.editNomenculature}?nomenculatureId=${selected}`}>
            <ForwardIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

export default function NomencTable(data) {
  console.log(data)
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("nomenculatureId");
  const [selected, setSelected] = React.useState(0);
  const [selectedName, setSelectedName] = React.useState(null)
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id, name) => {
    if (selected === id) {
      setSelected(null)
    } else {
      setSelected(id);
    }
    if (selectedName === name) {
      setSelectedName(null)
    } else {
      setSelectedName(name)
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected === id;

  // ровный вывод в конце последней страницы
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - data?.nomenculatures.length)
      : 0;

  const visibleRows = React.useMemo(() => {
    if (Array.isArray(data?.nomenculatures)) {
      return data.nomenculatures.sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
  }, [order, orderBy, page, rowsPerPage, data]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selectedItemName={selectedName}
          selected={selected} 
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              selectedItemName={selectedName}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {Array.isArray(visibleRows) &&
                visibleRows.map((row, index) => {
                  console.log(row, 456653562)
                  const isItemSelected = isSelected(row.nomenculatureId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.nomenculatureId, row.nomenculatureName)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.nomenculatureId}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {row.nomenculatureId}
                      </TableCell>
                      <TableCell align="right">
                        {row.nomenculatureCode}
                      </TableCell>
                      <TableCell align="right">
                        {row.nomenculatureName}
                      </TableCell>
                      <TableCell align="right">{row.consignmentId}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Array.isArray(data?.nomenculatures) ? data.nomenculatures.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
