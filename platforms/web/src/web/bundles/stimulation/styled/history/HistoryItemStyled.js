import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const Wrapper = styled(Flex)`
  background-color: #fff;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  box-shadow: ${props => props.theme.shadows.panel};
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.open.grayHov};
  }
`;

export const Text = styled.div``;
