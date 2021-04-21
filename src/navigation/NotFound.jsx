import React from "react";
import { Link, Typography } from "@material-ui/core";
import { ROOT } from "./CONSTANTS";
import { LinkRounded } from "@material-ui/icons";

export const NotFound = () => {
  return (
    <div className="notFound">
      <Link href={ROOT}>Home</Link>
      <Typography variant="h2">404: page not found!</Typography>
    </div>
  );
};
