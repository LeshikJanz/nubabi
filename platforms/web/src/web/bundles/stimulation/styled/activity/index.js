import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  position: relative;
  margin: 50px 15px 0;
  height: 100%;
`;

export const BackButton = styled.div`
  position: absolute;
  top: -40px;
`;
