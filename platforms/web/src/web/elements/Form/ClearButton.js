import React from "react";
import Button from "../Button";

export default ({ pristine, submitting, children, onClick }) =>
  <Button type="button" disabled={pristine || submitting} onClick={onClick}>
    {children}
  </Button>;
