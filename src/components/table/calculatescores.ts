import _ from "lodash"
import { PreProcessData, ScoreData, ScoreDataUserName } from "./leaderboard-table.types"

export const calculateScores = (data: PreProcessData[]) => {
    console.log("data", data)
  var result = new Map<string, ScoreData>();
  var daysOne = _.sortBy(_.groupBy(data, "day"), ["timeTakenMsOne"], ["asc"]);
  var daysTwo = _.sortBy(_.groupBy(data, "day"), ["timeTakenMsTwo"], ["asc"]);
  var scoresPerDayOne = daysOne.map((day) =>
    day.map((x, ind) => {
      return {
        score: day.length - ind,
        timeTakenMsOne: x.timeTakenMsOne,
        timeTakenMsTwo: null,
        totalTimeTakenMs: null,
        username: x.username,
      } as ScoreDataUserName;
    })
  );

  var scoresPerDayTwo = daysTwo.map((day) =>
    day.map((x, ind) => {
      return {
        score: day.length - ind,
        timeTakenMsOne: null,
        timeTakenMsTwo: x.timeTakenMsTwo,
        username: x.username,
        totalTimeTakenMs: x.starTwo ? x.timeTakenMsTwo : x.timeTakenMsOne,
      } as ScoreDataUserName;
    })
  );

  console.log("scoresPerDayOne", scoresPerDayOne)
  console.log("scoresPerDayTwo", scoresPerDayTwo);

  scoresPerDayOne.forEach((day) =>
    day.forEach((x) => {
      var entry =
        result.get(x.username) ??
        ({ score: 0, timeTakenMsOne: 0, timeTakenMsTwo: 0, totalTimeTakenMs: 0 } as ScoreData);
      result.set(x.username, {
        score: entry.score + x.score,
        timeTakenMsOne: entry.timeTakenMsOne + x.timeTakenMsOne,
        timeTakenMsTwo: 0,
        totalTimeTakenMs: 0
      });
    })
  );

  console.log("result after 1", result)

  scoresPerDayTwo.forEach((day) =>
    day.forEach((x) => {
      var { score, timeTakenMsOne, timeTakenMsTwo, totalTimeTakenMs } = result.get(x.username);
      result.set(x.username, {
        score: x.score + score,
        timeTakenMsOne,
        timeTakenMsTwo: timeTakenMsTwo + x.timeTakenMsTwo,
        totalTimeTakenMs: totalTimeTakenMs + x.totalTimeTakenMs,
      });
    })
  );

  console.log("final", result)

  return result;
};
