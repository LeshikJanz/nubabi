import React from "react";
import styled from "styled-components";

type Props = {
  onClick: () => void,
  primary: boolean,
  children: Object
};

const Button = styled.button``;

const ButtonOutline = styled.button``;

export default ({ onClick, primary, children, disabled, p }: Props) =>
  primary
    ? <Button onClick={onClick} disabled={disabled} p={p}>
        {children}
      </Button>
    : <ButtonOutline onClick={onClick} disabled={disabled}>
        {children}
      </ButtonOutline>;
