import React from "react";
import Button from "../Button";

export default ({ pristine, submitting, children }) =>
  <Button type="submit" disabled={pristine || submitting} primary={true}>
    {children}
  </Button>;
