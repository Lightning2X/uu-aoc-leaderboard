import {
  colors,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core";
import "fontsource-roboto";
import LandingPage from "pages/landingPage/landingPage";
import LeaderBoardPage from "pages/leaderBoardPage/leaderBoardPage";
import UserPage from "pages/userPage/userPage";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/navBar/navBar";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#fd7014",
    },
    secondary: {
      main: "#393e46",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: "#222831",
    },
    text: {
      primary: "#eeeeee",
      secondary: "#eeeeee",
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <NavBar />
          <header className="App-header"></header>
          <Router>
            <Switch>
              <Route path="/leaderboard/:id">
                <LeaderBoardPage />
              </Route>
              <Route path="/user/:id">
                <UserPage />
              </Route>
              <Route path="/">
                <LandingPage />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
