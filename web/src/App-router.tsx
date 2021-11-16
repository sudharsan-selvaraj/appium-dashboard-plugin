import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Dashboard from "./components/pages/dashboard";
import PageNotFound from "./components/pages/page-not-found";
import { BASE_URL } from "./constants/routes";
import { getSelectedTheme } from "./store/selectors/ui/theme-selector";

export default function AppRouter() {
  const theme = useSelector(getSelectedTheme);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path={BASE_URL} component={Dashboard} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
