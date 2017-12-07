import styled from 'styled-components';
import { Flex } from 'grid-styled';

export const Wrapper = styled(Flex)`
  flex-direction: column;
  padding: 28px 15px;
  border: solid 1px ${props => props.theme.colors.open.white2};
  position: relative;
  border-top: none;
  background-color: #fff;
`;

export const StepNumber = styled.div`
  width: 30px;
  height: 30px;
  color: ${props => props.theme.colors.open.gray3};
  background-color: ${props => props.theme.colors.open.white2};
  border-radius: 100%;
  padding: 7px 11px;
`;

export const StepText = styled.div`
  ${props => props.theme.text.default};
  padding: 0 15px;
`;

export const Container = styled(Flex)`
  justify-content: flex-start;
  margin: 20px 0;
`;

export const ActivityHeadingText = styled(Flex)`
  ${props => props.theme.text.h3};
`;
