import { leaderBoardDataLocalStore } from "components/leaderboard/data/leaderBoardData.store";
import LeaderBoardTable from "components/leaderboard/table/leaderboard-table";
import { PageNav } from "components/page-nav/page-nav";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore, withObserver } from "shared/stores";
import { IDParams } from "shared/types/idparams";
import styles from "../page.module.scss";

function LeaderBoardPage() {
  const { id } = useParams<IDParams>();

  const { getLeaderBoardData, name, userData, isLoading, isError } = useStore(
    leaderBoardDataLocalStore
  );

  useEffect(() => {
    getLeaderBoardData(id);
  }, [getLeaderBoardData, id]);

  return (
    <div className={styles["page-container"]}>
      <PageNav />
      <h1>{name}</h1>
      <LeaderBoardTable
        userData={userData}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

export default withObserver(LeaderBoardPage);
