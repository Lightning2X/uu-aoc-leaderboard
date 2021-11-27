import React from "react";
import { AOC_DAYS } from "shared/constants";
import { formatMiliseconds } from "shared/utilities";
import { StarData } from "../data/leaderboard-data.types";

export const starTableFormatterOne = (value: unknown) => {
  var starDataArray = value as StarData[];

  return (
    <React.Fragment>
      {starDataArray.filter((x) => !!x.one).length + "/" + AOC_DAYS}
    </React.Fragment>
  );
};

export const starTableFormatterTwo = (value: unknown) => {
  var starDataArray = value as StarData[];

  return (
    <React.Fragment>
      {starDataArray.filter((x) => !!x.two).length + "/" + AOC_DAYS}
    </React.Fragment>
  );
};

export const miliSecondTableFormatter = (value: unknown) => {
  return <React.Fragment>{formatMiliseconds(value as number)}</React.Fragment>;
};
