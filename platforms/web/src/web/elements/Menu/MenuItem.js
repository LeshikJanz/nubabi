import React from "react";
import styled from "styled-components";

export default ({ as, to, active, children, onClick }) => {
  const Wrapper = styled.li`
    color: ${props =>
      active ? props.theme.colors.blue2 : props.theme.colors.black};
  `;
  let Element;
  if (as === undefined || to === undefined) {
    Element =
      to === undefined ? (
        <a onClick={onClick}>{children}</a>
      ) : (
        <a href={to}>{children}</a>
      );
  } else {
    const ElementAs = as;
    Element = <ElementAs to={to}>{children}</ElementAs>;
  }
  return <Wrapper>{Element}</Wrapper>;
};
