import { Alert } from "@material-ui/core";
import { useState } from "react";

export type Color = "success" | "info" | "warning" | "error";
export const AlertMessage = ({ type, message, setAlertData }) => {
  setTimeout(() => {
    setAlertData();
  }, 3000);
  return (
      <Alert severity={type}>
        {message}
        <strong>!</strong>
      </Alert>
  );
};
