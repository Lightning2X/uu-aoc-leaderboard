import { Button } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import PlaceHolder from "components/placeholder/placeholder";
import StarChart from "./star-chart/star-chart";
import StarList from "./star-list/star-list";
import styles from "./user.module.scss";
import { UserPageContentProps } from "./user.types";
function UserPageContent(props: UserPageContentProps) {
  const { isError, isLoading, userInfo, year } = props;
  if (isError || isLoading) {
    return <PlaceHolder isError={isError} isLoading={isLoading} />;
  }

  const getChartDisplay = (chart: JSX.Element) => {
    return userInfo.challenges.length ? chart : <h4>No data yet</h4>;
  };

  return (
    <div className={styles.content}>
      <img
        className={styles["profile-picture"]}
        src={userInfo.profilePic ?? "/default-profile-pic.png"}
        alt={"Github profile img"}
      />
      <Button
        className={styles.element}
        variant="outlined"
        onClick={() => window.open(userInfo.githubPage)}
        disabled={!userInfo.githubPage}
        startIcon={<GitHub className={"menu-icon"} />}
      >
        Github profile
      </Button>
      <h3 className={styles.element}>Stars obtained: </h3>
      {getChartDisplay(<StarList data={userInfo.challenges} year={year} />)}
      <h3 className={styles.element}>Minutes per Star:</h3>
      {getChartDisplay(<StarChart data={userInfo.challenges} />)}
    </div>
  );
}

export default UserPageContent;
