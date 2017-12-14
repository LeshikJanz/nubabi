// @flow
import * as React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { RadioForInput } from 'web/elements';

const UnitPreferencesContainer = styled(Flex)`
  flex-direction: column;
  padding: 30px;
  color: ${props => props.theme.colors.label};
  width: 100%;
  height: 532px;
`;

export const Title = styled.h3`
  font-weight: 300;
  font-size: 18px;
  margin: 0;
`;

const Option = styled(Flex)`
  position: relative;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  padding-bottom: 10px;
  margin-top: 30px;
`;

const Label = styled.span`
  color: ${props => props.theme.colors.secondary};
  font-weight: 300;
`;

const Radio = styled(RadioForInput)`
  position: absolute;
  right: 0;
  bottom: 5px;
`;

const UnitPreferences = () => {
  return (
    <UnitPreferencesContainer>
      <Title>Unit Preferences</Title>
      <Option>
        <Label>Weight</Label>
        <Radio name="weight" variants={['kg', 'lbs']} />
      </Option>
      <Option>
        <Label>Height</Label>
        <Radio name="height" variants={['cm', 'in']} />
      </Option>
    </UnitPreferencesContainer>
  );
};

export default UnitPreferences;
