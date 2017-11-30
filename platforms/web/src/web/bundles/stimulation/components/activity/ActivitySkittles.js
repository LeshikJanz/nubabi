// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

const SkittlesWrapper = styled(Flex)`
  flex-direction: column;
  padding: 28px 15px;
  border: solid 1px ${props => props.theme.colors.open.white2};
  position: relative;
  border-top: none;
`;

const SkittleStepNumber = styled.div`
  width: 30px;
  height: 30px;
  color: ${props => props.theme.colors.open.gray3};
  background-color: ${props => props.theme.colors.open.white2};
  border-radius: 100%;
  padding: 7px 11px;
`;

const SkittleStepText = styled.div`
  ${props => props.theme.text.default};
  padding: 0 15px;
`;

const SkittleContainer = styled(Flex)`
  justify-content: flex-start;
  margin: 20px 0;
`;

const ActivityHeadingText = styled(Flex)`
  ${props => props.theme.text.h3};
`;

type Props = {
  steps: string[],
};

const ActivitySkittles = ({ steps }: Props) => (
  <SkittlesWrapper>
    <ActivityHeadingText>Lets begin Skittles</ActivityHeadingText>
    {steps.map((step, i) => (
      <SkittleContainer key={i}>
        <SkittleStepNumber>{i + 1}</SkittleStepNumber>
        <SkittleStepText>{step}</SkittleStepText>
      </SkittleContainer>
    ))}
  </SkittlesWrapper>
);

export default ActivitySkittles;
