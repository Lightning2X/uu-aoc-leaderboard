import { PageNav } from "components/page-nav/page-nav";
import { userLocalStore } from "components/user/user.store";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore, withObserver } from "shared/stores";
import { IDParams } from "shared/types/idparams";
import styles from "../page.module.scss";

function UserPage() {
  const { id } = useParams<IDParams>();

  const { isLoading, isError } = useStore(userLocalStore);

  useEffect(() => {}, [id]);

  return (
    <div className={styles["page-container"]}>
      <PageNav />
      {/* <h1>{name}</h1> */}
    </div>
  );
}

export default withObserver(UserPage);
