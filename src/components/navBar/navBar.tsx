import { AppBar, Box, Button, IconButton, Toolbar } from "@material-ui/core";
import { AlternateEmail, Code, Home } from "@material-ui/icons";
import React from "react";
import styles from "./navBar.module.scss";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/*Left side Icons*/}
        <Box display="flex" flexGrow={1}>
          <IconButton href="/" edge="start" color="inherit" aria-label="home">
            <Home className={"menu-icon"} />
          </IconButton>
        </Box>

        {/*Right side Icons*/}
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Button
            className={styles.button}
            variant="outlined"
            onClick={() =>
              window.open("https://github.com/Lightning2X/uu-aoc-leaderboard")
            }
            startIcon={<Code className={"menu-icon"} />}
          >
            Source
          </Button>
          <Button
            className={styles.button}
            variant="outlined"
            href="mailto:tim@schagen.dev"
            startIcon={<AlternateEmail className={"menu-icon"} />}
          >
            Contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
