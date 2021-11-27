import _ from "lodash"
import { ChallengeDTO } from "shared/types/dto"
import { calculateScores } from "./calculatescores"
import { UserData, StarData, LeaderBoardData } from "./leaderboard-data.types"

export const mapToUserData = (data: LeaderBoardData[]) => { 
  var grouped = _.mapValues(_.groupBy(data, "username"), (list) =>
    list.map((user) => _.omit(user, "username"))
  );
  const scoreMap = calculateScores(data);
  var userDataArray = [] as UserData[];
  Object.entries(grouped).forEach((userEntry) => {
    const stars = userEntry[1].map((x) => {
      return { day: x.day, one: !!x.starOne, two: !!x.starTwo } as StarData;
    });
    const row: UserData = {
      user: userEntry[0],
      stars: _.sortBy(stars, ["day"], ["asc"]),
      score: scoreMap.get(userEntry[0])?.score,
      totalTime: scoreMap.get(userEntry[0])?.totalTimeTakenMs,
    };
    userDataArray.push(row);
  });

  return userDataArray;
};

export const mapToLeaderBoardData = (data: ChallengeDTO[]) => {
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
          year: x.year,
          username: x.username,
          starOne,
          starTwo,
          startTime,
          timeTakenMsOne: getTimeTaken(startTime, starOne),
          timeTakenMsTwo: getTimeTaken(startTime, starTwo),
        } as LeaderBoardData;
      })
  );
};

const getTimeTaken = (startTime: Date, star: Date) => {
  if (!startTime || !star) {
    return null;
  }
  return star.valueOf() - startTime.valueOf();
};
