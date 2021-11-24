import { Star } from "@material-ui/icons";
import React from "react";
import { AOC_DAYS } from "shared/constants";
import { formatMiliseconds } from "shared/utilities";
import { StarData } from "../data/leaderboard-data.types";
import styles from "./table.module.scss";

export const starTableFormatter = (value: unknown) => {
  var starDataArray = value as StarData[];

  return (
    <React.Fragment>
      {starDataArray.map((x) => (
        <Star
          className={styles["star-icon"]}
          style={{ color: x.two ? "gold" : "silver" }}
        ></Star>
      ))}
      {" [" +
        // we can sneakily calculate how many stars there are because we know each entry has at least one star, therefore we just have to subtract
        // the "missing" second stars to get the correct count
        (starDataArray.length * 2 -
          (starDataArray.length - starDataArray.filter((x) => x.two).length)) +
        " / " +
        AOC_DAYS * 2 +
        "]"}
    </React.Fragment>
  );
};

export const miliSecondTableFormatter = (value: unknown) => {
  return <React.Fragment>{formatMiliseconds(value as number)}</React.Fragment>;
};