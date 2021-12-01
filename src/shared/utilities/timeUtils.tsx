import _ from "lodash";

export function formatMiliseconds(ms: number) {
  let seconds = ms / 1000;
  let minutes = ms / (1000 * 60);
  let hours = ms / (1000 * 60 * 60);
  let days = ms / (1000 * 60 * 60 * 24);
  if (seconds < 60) return seconds.toFixed(1) + "S";
  else if (minutes < 60) return minutes.toFixed(1) + "M";
  else if (hours < 24) return hours.toFixed(1) + "H";
  else return days.toFixed(1) + "D";
}

export const getTimeDifference = (start: Date, end: Date) => {
  if (!start || !end) {
    return null;
  }
  return end.valueOf() - start.valueOf();
};

export const msToMin = (ms: number) => {
  return _.divide(ms, 60000);
};

export const flagDate = (date: Date, year: number) => {
  return date ? date.getUTCFullYear() > year : false;
};
