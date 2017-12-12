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
  cursor: pointer;
  top: -40px;
  color: darkblue;
  opacity: 0.9;

  &:hover {
    text-decoration: underline;
    opacity: 1;
    transition: all 0.2s;
  }
`;
