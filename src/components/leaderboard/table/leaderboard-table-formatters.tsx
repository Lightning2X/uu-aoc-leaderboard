import { Tooltip } from "@material-ui/core";
import { Flag } from "@material-ui/icons"
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

export const flagTableFormatter = (value: unknown) => {
  const flagged = value as boolean;
  if (flagged) {
    return (
      <Tooltip title="This user has completed one or more challenges after the official AOC ended">
        <Flag style={{ color: "red" }} />
      </Tooltip>
    );
  }
};
