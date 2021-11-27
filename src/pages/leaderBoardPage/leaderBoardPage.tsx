import LeaderBoardTable from "components/leaderboard/table/leaderboard-table";
import { PageNav } from "components/page-nav/page-nav"
import React from "react";
import { useParams } from "react-router-dom";
import { IDParams } from "shared/types/idparams";
import styles from "../page.module.scss";

function LeaderBoardPage() {
  const { id } = useParams<IDParams>();
  return (
    <div className={styles["page-container"]}>
      <PageNav />
      <LeaderBoardTable id={id} />
    </div>
  );
}

export default LeaderBoardPage;
