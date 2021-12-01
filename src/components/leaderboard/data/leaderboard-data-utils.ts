import _ from "lodash";
import { ChallengeDTO } from "shared/types/dto";
import { flagDate, getTimeDifference } from "shared/utilities";
import { calculateScores } from "./calculatescores";
import { UserData, StarData, ChallengeData } from "./leaderboard-data.types";

export const mapToUserData = (data: ChallengeData[], year: number) => {
  var grouped = _.mapValues(_.groupBy(data, "userid"), (list) =>
    list.map((user) => _.omit(user, "userid"))
  );
  const scoreMap = calculateScores(data);
  var userDataArray = [] as UserData[];
  Object.entries(grouped).forEach((userEntry) => {
    const stars = userEntry[1].map((x) => {
      return { day: x.day, one: !!x.starOne, two: !!x.starTwo } as StarData;
    });
    const row: UserData = {
      userId: userEntry[0],
      userName: userEntry[1][0].userName,
      stars: _.sortBy(stars, ["day"], ["asc"]),
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
          totalTimeTakenMs: getTimeDifference(startTime, starTwo ?? starOne)
        } as ChallengeData;
      })
  );
};
