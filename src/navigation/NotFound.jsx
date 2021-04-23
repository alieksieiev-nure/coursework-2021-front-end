import React from "react";
import { ROOT } from "./CONSTANTS";

export const NotFound = () => {
  return (
    <div className="notFound">
      <a href={ROOT}>Home</a>
      <h3 variant="h2">404: page not found!</h3>
    </div>
  );
};
