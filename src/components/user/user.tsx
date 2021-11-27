import { Button } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import PlaceHolder from "components/placeholder/placeholder";
import defaultProfilePic from "shared/media/default_profile.png";
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
        src={userInfo.profilePic ?? defaultProfilePic}
        alt={"Github profile img"}
      />
      <Button
        className={styles["github-button"]}
        variant="outlined"
        onClick={() =>
          window.open(userInfo.githubPage)
        }
        disabled={!userInfo.githubPage}
        startIcon={<GitHub className={"menu-icon"} />}
      >
        Github profile
      </Button>
    </div>
  );
}

export default UserPageContent;
