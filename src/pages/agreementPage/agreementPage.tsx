import { PageNav } from "components/page-nav/page-nav";
import React from "react";
import styles from "../page.module.scss";
function AgreementPage() {
  return (
    <div className={styles["page-container"]}>
      <PageNav />
      <h1>Gentlemen's Agreement</h1>
      <h2>As a gentleman/lady I will:</h2>

        <h3>
          1. Make my own solutions for AOC challenges, without googling or
          asking for complete / full solutions
        </h3>
        <h3>
          2. Not use any AI code pair programming tools such as Github co-pilot for any AOC challenge
        </h3>
        <h3>
          3. Not spam an unreasonable amount of requests to this website or it's
          backend
        </h3>
    </div>
  );
}

export default AgreementPage;
