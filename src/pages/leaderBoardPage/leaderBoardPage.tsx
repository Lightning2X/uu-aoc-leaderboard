import LeaderBoardTable from "components/leaderboard/table/leaderboard-table";
import React from "react";
import styles from "../page.module.scss";
import { LeaderBoardPageProps } from "./leaderBoardPage.types";
function LeaderBoardPage(props: LeaderBoardPageProps) {
  return (
    <div className={styles["page-container"]}>
      <LeaderBoardTable />
    </div>
  );
}

export default LeaderBoardPage;
