import React from "react";
import Login from "./login";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Topbar from "./Dashboard/Global/Topbar";
import Sidebar from "./Dashboard/Global/Sidebar";
import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import Dashboard from "./Dashboard/Dashboard";

import Team from "./Dashboard/Team";
import EditSavings from "./Dashboard/editSavings";
import AddExpense from "./Dashboard/AddExpense";
import ViewExpense from "./Dashboard/ViewExpense";
import Bar from "./Dashboard/Bar";
import Line from "./Dashboard/Line";
import Pie from "./Dashboard/Pie";
import Radar from "./Dashboard/Radar";
import Calender from "./Dashboard/Calender";

import { useAuth } from "../contexts/AuthContext";
import GraphWrapper from "./Dashboard/Barchart";

function App() {
  const [theme, colorMode] = useMode();
  const { currentUser } = useAuth();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <div className="app">
            {currentUser && <Sidebar />}
            <main className="content">
              {currentUser && <Topbar />}
              <Container>
                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/"
                      element={<Dashboard />}
                    />
                  </Route>

                  <Route element={<LoginRoute />}>
                    <Route
                      exact
                      path="/login"
                      element={<Login />}
                    />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/houseMembers"
                      element={<Team />}
                    />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/addExpense"
                      element={<AddExpense />}
                    />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/editSavings"
                      element={<EditSavings />}
                    />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/viewExpense"
                      element={<ViewExpense />}
                    />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route element={<PrivateRoute />}>
                      <Route
                        exact
                        path="/bar"
                        element={
                          <GraphWrapper
                            title="Expenses By Category"
                            subtitle={"Last 2 Wks"}
                            height="75vh"
                          >
                            <Bar />
                          </GraphWrapper>
                        }
                      />
                    </Route>
                  </Route>
                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/line"
                      element={
                        <GraphWrapper
                          title="Expenses Sum"
                          subtitle={"1 Month"}
                          height="75vh"
                        >
                          {" "}
                          <Line />
                        </GraphWrapper>
                      }
                    />
                  </Route>
                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/pie"
                      element={
                        <GraphWrapper
                          title="Expenses By Category"
                          subtitle={"1 Month"}
                          height="75vh"
                        >
                          <Pie />
                        </GraphWrapper>
                      }
                    />
                  </Route>
                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/radar"
                      element={
                        <GraphWrapper
                          title="Expenses By Category"
                          subtitle={"3 Months"}
                          height="75vh"
                        >
                          <Radar />
                        </GraphWrapper>
                      }
                    />
                  </Route>

                  <Route element={<PrivateRoute />}>
                    <Route
                      exact
                      path="/cal"
                      element={<Calender />}
                    />
                  </Route>
                </Routes>
              </Container>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
