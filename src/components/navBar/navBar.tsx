import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import { AlternateEmail, Chat, GitHub, Home } from "@material-ui/icons";
import React from "react";

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
          <IconButton
            onClick={() =>
              window.open("https://github.com/Lightning2X/uu-aoc-leaderboard")
            }
            edge="start"
            color="inherit"
            aria-label="source-code"
          >
            <GitHub className={"menu-icon"} />
          </IconButton>
          <IconButton
            onClick={() => window.open("https://discord.gg/5xu3ZQhyDm")}
            edge="start"
            color="inherit"
            aria-label="discord"
          >
            <Chat className={"menu-icon"} />
          </IconButton>
          <IconButton
            href="mailto:tim@schagen.dev"
            edge="start"
            color="inherit"
            aria-label="mail"
          >
            <AlternateEmail className={"menu-icon"} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
