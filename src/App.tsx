import {
  colors,
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";
import "fontsource-roboto";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import NavBar from "./components/navBar";
import MainPage from "./mainPage/mainPage";

// Create a theme instance.
let theme = createMuiTheme({
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <NavBar />
        <header className="App-header"></header>
        <Router>
          <Switch>
            <Route path="/about">
              <MainPage />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
