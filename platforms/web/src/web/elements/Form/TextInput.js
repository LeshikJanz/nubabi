import React from "react";
import Input from "../Input";

export default ({ name, placeholder, validate }) =>
  <Input
    name={name}
    type="text"
    placeholder={placeholder}
    validate={validate}
  />;
