import { TextField } from "@material-ui/core";
import { siteStore } from "global/site.store";
import React from "react";
import { useHistory } from "react-router";
import { withObserver } from "shared/stores";
import styles from "../page.module.scss";
function LandingPage() {
  const history = useHistory();
  // Probably a React event, but mui doesnt provide typings here
  const onEnterPress = (e: any) => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();
      if (siteStore.leaderBoards.some((x) => x.id === e.target.value)) {
        history.push(`leaderboard/${value}`);
      }

      if (siteStore.leaderBoards.some((x) => x.name === e.target.value)) {
        const id = siteStore.leaderBoards.find(
          (x) => x.name === e.target.value
        ).id;
        history.push(`leaderboard/${id}`);
      }
    }
  };
  return (
    <div className={styles["page-container"]}>
      <h2>Please type a leaderboard name/ID and press enter:</h2>
      <TextField
        style={{ width: "30%" }}
        id="leaderboard-text"
        label="Leaderboard"
        onKeyPress={onEnterPress}
      />
    </div>
  );
}

export default withObserver(LandingPage);
