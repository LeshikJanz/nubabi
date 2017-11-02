import React from "react";
import Field from "redux-form/es/Field";
import InputWithError from "../InputWithError";

const InputField = ({ name, type, placeholder, value, input }) => (
  <input {...input} type={type} placeholder={placeholder} />
);

export default ({ name, type, placeholder, validate, value, input }) => {
  let component = InputField;
  if (validate != null) {
    component = InputWithError;
  }
  return (
    <Field
      component={component}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      validate={validate}
    />
  );
};
