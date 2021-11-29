import { ChallengeDTO } from "shared/types/dto";
import { getTimeDifference, msToMin } from "shared/utilities";
import { ChartData } from "./star-chart.types";

export const mapToChartdata = (data: ChallengeDTO[]) => {
  return (
    data
      // We do not care for anything that will not result in a score
      .filter((x) => x.starOne && x.startTime)
      .map((x) => {
        const startTime = new Date(x.startTime);
        const starOne = new Date(x.starOne);
        const starTwo = x.starTwo ? new Date(x.starTwo) : null;
        return {
          day: x.day,
          star1: msToMin(getTimeDifference(startTime, starOne)).toFixed(2),
          star2: starTwo
            ? msToMin(getTimeDifference(startTime, starTwo)).toFixed(2)
            : null,
        } as ChartData;
      })
  );
};
