import { appGlobalStore } from "app.store";
import { PageNav } from "components/page-nav/page-nav";
import UserPageContent from "components/user/user";
import { userLocalStore } from "components/user/user.store";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore, withObserver } from "shared/stores";
import { IDParams } from "shared/types/idparams";
import styles from "../page.module.scss";

function UserPage() {
  const { id } = useParams<IDParams>();

  const { isLoading, isError, getUserData, userInfo } =
    useStore(userLocalStore);

  useEffect(() => {
    getUserData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserData, id, appGlobalStore.year]);

  return (
    <div className={styles["page-container"]}>
      <PageNav />
      <h1>{userInfo ? userInfo.username : null}</h1>
      <UserPageContent
        userInfo={userInfo}
        year = {appGlobalStore.year}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
}

export default withObserver(UserPage);
