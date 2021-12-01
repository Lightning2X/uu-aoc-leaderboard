import { ChallengeData, ScoreData } from "./leaderboard-data.types";

export const calculateScores = (data: ChallengeData[]) => {
  const userIds = Array.from(new Set(data.map((entry) => entry.userId)));
  const userCount = userIds.length;

  // Create output data structure
  const totals = new Map(
    userIds.map((userId) => [
      userId,
      {
        score: 0,
        timeTakenMsOne: 0,
        timeTakenMsTwo: 0,
        totalTimeTakenMs: 0,
      } as ScoreData,
    ])
  );

  // Group by day and sort by time ASC (shortest = best); filter users ineligible for score
  const partOneSort = Array.from(Array(26)).map((_, day) => {
    const dayData = data.filter((entry) => entry.day === day);
    return dayData.sort((a, b) => a.timeTakenMsOne - b.timeTakenMsOne);
  });
  const partTwoSort = Array.from(Array(26)).map((_, day) => {
    const dayData = data.filter(
      (entry) => entry.day === day && entry.timeTakenMsTwo !== null
    );
    return dayData.sort((a, b) => a.timeTakenMsTwo - b.timeTakenMsTwo);
  });

  // Add time and score in reverse time sort (slowest time is 1pt, 2nd-slowest time is 2pt, etc)
  partOneSort.forEach((day) =>
    day.forEach((entry, i) => {
      const userTotal = totals.get(entry.userId);
      userTotal.score += userCount - i;
      userTotal.timeTakenMsOne += entry.timeTakenMsOne;
    })
  );
  partTwoSort.forEach((day) =>
    day.forEach((entry, i) => {
      const userTotal = totals.get(entry.userId);
      userTotal.score += userCount - i;
      userTotal.timeTakenMsTwo += entry.timeTakenMsTwo ?? 0;
    })
  );

  // Compute total times per user
  totals.forEach((userTotal) => {
    userTotal.totalTimeTakenMs =
      userTotal.timeTakenMsOne + userTotal.timeTakenMsTwo;
  });

  return totals;
};
