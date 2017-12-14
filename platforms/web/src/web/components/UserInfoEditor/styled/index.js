import { Flex } from 'grid-styled';
import styled from 'styled-components';

export const InfoChangerContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
`;

export const InputContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.gray};
  font-family: sans-serif;
  font-size: 10px;
  font-weight: 300;
`;
