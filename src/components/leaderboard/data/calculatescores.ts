import _ from "lodash"
import { LeaderBoardData, ScoreData, ScoreDataUserName } from "./leaderboard-data.types"

export const calculateScores = (data: LeaderBoardData[]) => { 
  var result = new Map<string, ScoreData>();
  // Sort on time taken to find the top scoring users
  var daysOne = _.sortBy(_.groupBy(data, "day"), ["timeTakenMsOne"], ["asc"]);
  var daysTwo = _.sortBy(_.groupBy(data.filter(x => !!x.starTwo), "day"), ["timeTakenMsTwo"], ["asc"]);

  // Map to scores per day per star one
  var scoresPerDayOne = daysOne.map((day) =>
    day.map((x, ind) => {
      return {
        day: x.day,
        username: x.username,
        score: day.length - ind,
        timeTakenMsOne: x.timeTakenMsOne,
        timeTakenMsTwo: null,
        totalTimeTakenMs: null,
      } as ScoreDataUserName;
    })
  );

  // Map to scores per day per star two
  var scoresPerDayTwo = daysTwo.map((day) =>
    day.map((x, ind) => {
      return {
        day: x.day,
        username: x.username,
        score: day.length - ind,
        timeTakenMsOne: null,
        timeTakenMsTwo: x.timeTakenMsTwo,
        // If star two hasnt been solved, the total time is star one
        totalTimeTakenMs: x.starTwo ? x.timeTakenMsTwo : x.timeTakenMsOne,
      } as ScoreDataUserName;
    })
  );
 
  // Map the first results (of star one) into the result Dictionary
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

  // Map the second results (of star two) into the result Dictionary
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

  return result;
};
