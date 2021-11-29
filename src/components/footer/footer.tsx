import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@material-ui/core";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import { appGlobalStore } from "app.store";
import React from "react";
import { withObserver } from "shared/stores";
import styles from "./footer.module.scss";
function Footer() {
  return (
    <Paper className={styles.footer} elevation={3}>
      <BottomNavigation
        showLabels
        className={styles["bottom-nav"]}
        value={appGlobalStore.year}
        onChange={(event, newValue) => {
          // previous button has the value 0
          if (newValue === 0) {
            appGlobalStore.setYear(appGlobalStore.year - 1);
            return;
          }
          // next button has the value 2, because of the year text in the middle
          appGlobalStore.setYear(appGlobalStore.year + 1);
        }}
      >
        <BottomNavigationAction
          className={styles["nav-action"]}
          label="Previous Year"
          icon={<ArrowLeft />}
        />
        <p className={styles.year}>{appGlobalStore.year}</p>
        <BottomNavigationAction
          className={styles["nav-action"]}
          label="Next Year"
          icon={<ArrowRight />}
        />
      </BottomNavigation>
    </Paper>
  );
}

export default withObserver(Footer);
