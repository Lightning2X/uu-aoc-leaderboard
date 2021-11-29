import { Star, StarBorder } from "@material-ui/icons";
import { AOC_DAYS } from "shared/constants";
import { ChallengeDTO } from "shared/types/dto";
import { StarListData, StarListProps } from "./star-list.types";

function StarList(props: StarListProps) {
  const { data, className } = props;

  const getStarListData = (challenges: ChallengeDTO[]) => {
    const result = [] as StarListData[];
    for (let i = 1; i <= AOC_DAYS; i++) {
      const userDay = challenges.find((x) => x.day === i);
      if (userDay === undefined) {
        result.push({ day: i, star1: false, star2: false });
        continue;
      }
      result.push({
        day: i,
        star1: !!userDay.starOne,
        star2: !!userDay.starTwo,
      });
    }
    return result;
  };

  return (
    <div className={className}>
      {getStarListData(data).map((x) => {
        return x.star1 ? (
          <Star style={{ color: x.star2 ? "gold" : "silver" }} />
        ) : (
          <StarBorder />
        );
      })}
    </div>
  );
}

export default StarList;
