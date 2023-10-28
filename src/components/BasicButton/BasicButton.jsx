import React from "react";
import { Button } from "@mui/material";

const BasicButton = (props) => {
  const { text } = props;
  return (
    <Button {...props} variant="contained">
      {text}
    </Button>
  );
};

export default BasicButton;
