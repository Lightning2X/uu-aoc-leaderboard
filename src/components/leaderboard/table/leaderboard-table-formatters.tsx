import { Tooltip } from "@material-ui/core";
import { Flag } from "@material-ui/icons";
import React from "react";
import { AOC_DAYS } from "shared/constants";
import { formatMiliseconds } from "shared/utilities";

export const userNameTableFormatter = (value: unknown, index: number) => {
  return <React.Fragment>{(index + 1 + ". " + value) as string}</React.Fragment>;
};
export const starTableFormatter = (value: unknown) => {
  return <React.Fragment>{(value as number) + "/" + AOC_DAYS}</React.Fragment>;
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
