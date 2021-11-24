import LeaderBoardTable from "components/leaderboard/table/leaderboard-table";
import React from "react";
import styles from "../page.module.scss";
import { MainPageProps } from "./mainPage.types";
function MainPage(props: MainPageProps) {
  return (
    <div className={styles["page-container"]}>
      <LeaderBoardTable />
    </div>
  );
}

export default MainPage;
