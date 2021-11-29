import { Button } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { useHistory } from "react-router";
import styles from "./page-nav.module.scss";
export function PageNav() {
  const history = useHistory();
  return (
    <div>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={() => history.goBack()}
        startIcon={<ArrowBack />}
      >
        Back
      </Button>
      <Button
        className={styles.button}
        variant="outlined"
        onClick={() => history.goForward()}
        startIcon={<ArrowForward />}
      >
        Forward
      </Button>
    </div>
  );
}
