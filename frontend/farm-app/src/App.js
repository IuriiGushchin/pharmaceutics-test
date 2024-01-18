import "./App.css";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "./helpers/constants";
import NomenculaturesList from "./routes/nomenculaturesList/nomenculaturesList";
import CreateDocument from "./routes/createDocument/CreateDocument";
import CreateNomenculature from "./routes/createNomenculature/CreateNomenculature";
import EditNomenculature from "./routes/editNomenculature/EditNumenculature";
import Dashboard from "./helpers/testtest/Dashboard";
import Header from "./helpers/AppHeader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const defaultTheme = createTheme();

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <Header />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}>
            <Routes>
              <Route exact path="/" Component={NomenculaturesList} />
              <Route
                exact
                path={ROUTES_LIST.createDocument}
                Component={CreateDocument}
              />
              <Route
                exact
                path={ROUTES_LIST.createNomenculature}
                Component={CreateNomenculature}
              />
              <Route
                exact
                path={ROUTES_LIST.editNomenculature}
                Component={EditNomenculature}
              />
              <Route exact path={ROUTES_LIST.test} Component={Dashboard} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
