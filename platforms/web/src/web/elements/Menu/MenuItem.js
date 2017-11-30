// @flow
import type { Theme } from 'core/themes/defaultTheme';
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.Element<*>,
  as?: React.Element<*>,
  to: any,
  theme: Theme,
  active: boolean,
  onClick: () => void,
};

export const MenuItem = ({ as, to, active, children, onClick }: Props) => {
  const Wrapper = styled.li`
    color: ${props =>
      active ? props.theme.colors.blue2 : props.theme.colors.black};
  `;
  let Element;
  if (as === undefined || to === undefined) {
    Element =
      to === undefined ? (
        <button onClick={onClick}>{children}</button>
      ) : (
        <a href={to}>{children}</a>
      );
  } else {
    const ElementAs = as;
    Element = <ElementAs to={to}>{children}</ElementAs>;
  }
  return <Wrapper>{Element}</Wrapper>;
};

export default MenuItem;
