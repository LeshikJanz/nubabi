import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 15px;
`;

export const ListHeader = styled(Flex)`
  margin: 34px 0 15px;
`;

export const ListTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  color: ${props => props.theme.colors.open.black0};
`;
