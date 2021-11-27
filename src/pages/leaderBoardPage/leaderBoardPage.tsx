import LeaderBoardTable from "components/leaderboard/table/leaderboard-table";
import { overviewStore } from "components/overview/overview.store";
import { PageNav } from "components/page-nav/page-nav";
import React from "react";
import { useParams } from "react-router-dom";
import { withObserver } from "shared/stores";
import { IDParams } from "shared/types/idparams";
import styles from "../page.module.scss";

function LeaderBoardPage() {
  const { id } = useParams<IDParams>();
  return (
    <div className={styles["page-container"]}>
      <PageNav />
      <h1>
        {!overviewStore.isLoading
          ? overviewStore.leaderBoards.find((x) => x.id === id).name
          : ""}
      </h1>
      <LeaderBoardTable id={id} />
    </div>
  );
}

export default withObserver(LeaderBoardPage);
