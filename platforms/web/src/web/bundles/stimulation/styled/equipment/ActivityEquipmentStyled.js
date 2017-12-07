import styled from 'styled-components';
import { Flex } from 'grid-styled';

export const Wrapper = styled(Flex)`
  justify-content: flex-start;
  padding: 28px 15px;
  border: 1px solid ${props => props.theme.colors.open.white2};
  border-top: none;
  background-color: #fff;
`;

export const Text = styled.div`
  ${props => props.theme.text.h3};
`;
