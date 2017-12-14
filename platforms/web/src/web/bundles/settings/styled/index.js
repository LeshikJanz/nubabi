import styled from 'styled-components';
import { Flex } from 'grid-styled';

export const SettingsContainer = styled(Flex)`
  width: 100%;
  max-width: 1166px;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  font-family: sans-serif;
`;

export const SettingsPages = styled(Flex)`
  background-color: ${props => props.theme.colors.white};
  flex-grow: 2;
  max-width: 600px;
  box-shadow: 0px 0px 5px -1px ${props => props.theme.colors.gray};
`;
