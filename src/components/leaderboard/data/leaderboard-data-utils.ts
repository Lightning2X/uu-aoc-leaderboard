import _ from "lodash";
import { ChallengeDTO } from "shared/types/dto";
import { flagDate, getTimeDifference } from "shared/utilities";
import { calculateScores } from "./calculatescores";
import { UserData, ChallengeData } from "./leaderboard-data.types";

export const mapToUserData = (data: ChallengeData[], year: number) => {
  var grouped = _.mapValues(_.groupBy(data, "userId"), (list) =>
    list.map((user) => _.omit(user, "userId"))
  );
  const scoreMap = calculateScores(data);
  var userDataArray = [] as UserData[];
  Object.entries(grouped).forEach((userEntry) => {
    const row: UserData = {
      userId: userEntry[0],
      userName: userEntry[1][0].userName,
      totalStars1: userEntry[1].length,
      totalStars2: userEntry[1].filter((x) => !!x.starTwo).length,
      score: scoreMap.get(userEntry[0])?.score,
      totalTime: scoreMap.get(userEntry[0])?.totalTimeTakenMs,
      flagged: userEntry[1].some(
        (x) => flagDate(x.starOne, year) || flagDate(x.starTwo, year)
      ),
    };
    userDataArray.push(row);
  });

  return userDataArray;
};

export const mapToChallengeData = (data: ChallengeDTO[]) => {
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
          userName: x.username,
          userId: x.userid,
          starOne,
          starTwo,
          startTime,
          timeTakenMsOne: getTimeDifference(startTime, starOne),
          timeTakenMsTwo: getTimeDifference(startTime, starTwo),
          totalTimeTakenMs: getTimeDifference(startTime, starTwo ?? starOne),
        } as ChallengeData;
      })
  );
};
