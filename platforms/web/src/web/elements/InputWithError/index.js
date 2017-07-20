import React from "react";
import styled from "styled-components";

const Error = styled.span``;

const Warning = styled.span``;

export default ({
  input,
  placeholder,
  type,
  meta: { touched, error, warning }
}) =>
  <div>
    <input {...input} placeholder={placeholder} type={type} />
    {touched &&
      ((error &&
        <Error>
          {error}
        </Error>) ||
        (warning &&
          <Warning>
            {warning}
          </Warning>))}
  </div>;
