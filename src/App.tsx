import {
  colors,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core";
import "fontsource-roboto";
import AgreementPage from "pages/agreementPage/agreementPage";
import LandingPage from "pages/landingPage/landingPage";
import LeaderBoardPage from "pages/leaderBoardPage/leaderBoardPage";
import UserPage from "pages/userPage/userPage";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  MediaQueryContext,
  useMediaQuery,
} from "shared/utilities/useMediaQuery";
import "./App.scss";
import Footer from "./components/footer/footer";
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
    type: "dark",
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MediaQueryContext.Provider value={useMediaQuery()}>
          <CssBaseline />
          <div className="app">
            <NavBar />
            <Footer />
            <header className="App-header"></header>
            <Router>
              <Switch>
                <Route path="/leaderboard/:id">
                  <LeaderBoardPage />
                </Route>
                <Route path="/user/:id">
                  <UserPage />
                </Route>
                <Route path="/agreement">
                  <AgreementPage />
                </Route>
                <Route path="/">
                  <LandingPage />
                </Route>
              </Switch>
            </Router>
          </div>
        </MediaQueryContext.Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}

export default App;
