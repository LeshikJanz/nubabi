// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.Element<*>,
}
const H1 = styled.h1``;

export const Title = ({ children }: Props) => <H1>{children}</H1>;

export default Title;
