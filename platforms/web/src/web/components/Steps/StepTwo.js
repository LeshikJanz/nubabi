// @flow
import React from 'react';
import { TextInput, Selector, InputWithRadio } from 'web/elements';
import { Flex } from 'grid-styled';
import {
  StepContainer,
  StepTitle,
  Red,
  SubTitle,
  ButtonContainer,
  RedButton,
} from './StepOne';
import styled from 'styled-components';
import BabyPhoto from './BabyPhoto';
import BabyRadio from './BabyRadio';

type Props = {
  babyRadio: mixed,
  radioOnChange: Function,
};

const Thanks = styled.h3`
  font-weight: 300;
  font-family: sans-serif;
  margin-bottom: 7px;
`;

const BabyInfoContainer = styled(Flex)`
  background-color: white;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 1px 9px -1px ${props => props.theme.colors.gray};
  overflow: hidden;
  position: relative;
  margin: 35px 0px 20px 0;
  padding: 25px 0;
  width: 100%;
  max-width: 875px;
`;

const InputsContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  max-width: 400px;
  height: 455px;
`;

const StepTwoButtonContainer = styled(ButtonContainer)`
  max-width: 875px;
`;

const StepTwo = ({ babyRadio, radioOnChange }: Props) => {
  return (
    <StepContainer>
      <StepTitle>
        <Red>Step 2:</Red> Add your Baby
      </StepTitle>
      <Thanks>Thanks for signing up, Savannah</Thanks>
      <SubTitle>
        {
          "All that's left for you to do is to create a profile for your baby. Don't worry if the details aren't accurate, you can change them later."
        }
      </SubTitle>
      <BabyInfoContainer>
        <BabyPhoto />
        <BabyRadio babyRadio={babyRadio} radioOnChange={radioOnChange} />
        <InputsContainer>
          <TextInput placeholder="name" value="Charlotte" />
          <TextInput placeholder="born on" value="14/05/1985" />
          <Selector
            name="myRelationship"
            fieldPlaceholder="My relationship"
            options={[
              { value: 'Mother', label: 'Mother' },
              { value: 'Father', label: 'Father' },
            ]}
          />
          <TextInput help="test" placeholder="week baby born" value="38" />
          <InputWithRadio
            value="3.6kg"
            unitsRadioName="weight"
            variants={['kg', 'lbs']}
            placeholder="weight"
          />
          <InputWithRadio
            value="55cm"
            unitsRadioName="height"
            variants={['cm', 'in']}
            placeholder="height"
          />
        </InputsContainer>
      </BabyInfoContainer>
      <StepTwoButtonContainer>
        <RedButton type="primary">DONE</RedButton>
      </StepTwoButtonContainer>
    </StepContainer>
  );
};

export default StepTwo;
