import OverviewTable from "components/overview/overview-table";
import React from "react";
import styles from "../page.module.scss";
function LandingPage() {
  return (
    <div className={styles["page-container"]}>
      <OverviewTable />
    </div>
  );
}

export default LandingPage;
