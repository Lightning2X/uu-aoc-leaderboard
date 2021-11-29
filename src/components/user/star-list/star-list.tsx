import { Star, StarBorder } from "@material-ui/icons";
import { AOC_DAYS } from "shared/constants";
import { ChallengeDTO } from "shared/types/dto";
import { flagDate } from "shared/utilities";
import styles from "./star-list.module.scss";
import { StarListData, StarListProps } from "./star-list.types";
function StarList(props: StarListProps) {
  const { data, className, year } = props;

  const getStarListData = (challenges: ChallengeDTO[]) => {
    const result = [] as StarListData[];
    for (let i = 1; i <= AOC_DAYS; i++) {
      const userDay = challenges.find((x) => x.day === i);
      if (userDay === undefined) {
        result.push({ day: i, star1: false, star2: false, flagged: false });
        continue;
      }
      result.push({
        day: i,
        star1: !!userDay.starOne,
        star2: !!userDay.starTwo,
        flagged:
          flagDate(new Date(userDay.starOne), year) ||
          flagDate(new Date(userDay.starTwo), year),
      });
    }

    console.log(result);
    return result;
  };

  const starListData = getStarListData(data);

  const getColor = (starListData: StarListData) => {
    if (starListData.flagged && starListData.star2) {
      return "red";
    }

    if (starListData.flagged) {
      return "darkRed";
    }

    if (starListData.star2) {
      return "gold";
    }

    return "silver";
  };

  const getStarList = (data: ChallengeDTO[]) => {
    return starListData.map((x) => {
      return x.star1 ? <Star style={{ color: getColor(x) }} /> : <StarBorder />;
    });
  };

  return (
    <div className={className}>
      {getStarList(data)}
      {starListData.some((x) => x.flagged) ? (
        <h4
          className={styles.warning}
        >{`This user has gained stars after ${year}, these stars are marked in red`}</h4>
      ) : null}
    </div>
  );
}

export default StarList;
