import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const Wrapper = styled(Flex)`
  margin-top: 30px;
  background: ${props => props.theme.bg.panel};
  padding: 15px;
  flex-direction: column;
`;
