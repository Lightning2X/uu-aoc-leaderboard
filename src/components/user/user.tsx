import { Button } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import PlaceHolder from "components/placeholder/placeholder";
import StarChart from "./star-chart/star-chart";
import styles from "./user.module.scss";
import { UserPageContentProps } from "./user.types";
function UserPageContent(props: UserPageContentProps) {
  const { isError, isLoading, userInfo } = props;
  if (isError || isLoading) {
    return <PlaceHolder isError={isError} isLoading={isLoading} />;
  }
  console.log(userInfo.githubPage);
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
      <h3 className={styles.element}>Minutes per Star:</h3>
      {userInfo.challenges.length ? (
        <StarChart data={userInfo.challenges} />
      ) : (
        <h4>No data yet</h4>
      )}
    </div>
  );
}

export default UserPageContent;
