import { Flex, Box } from 'grid-styled';
import styled from 'styled-components';

export const ListWrapper = styled.div`
  font-family: ${props => props.theme.text.fontFamily};
  margin-left: ${props => props.theme.margins.appLeft};
  margin-right: ${props => props.theme.margins.appRight};
`;

export const ListHeader = styled(Flex)`
  margin-bottom: 14px;
`;

export const ListTitle = styled(Box)`
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  color: ${props => props.theme.colors.open.black0};
`;
