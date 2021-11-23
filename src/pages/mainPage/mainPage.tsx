import React from "react";
import LeaderBoardTable from "../../components/table/leaderboard-table";
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
