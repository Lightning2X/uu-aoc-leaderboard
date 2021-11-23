import { AppBar, Box, IconButton, Toolbar } from "@material-ui/core";
import { AlternateEmail, Chat, Home } from "@material-ui/icons";
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
            href="https://discord.gg/5xu3ZQhyDm"
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
