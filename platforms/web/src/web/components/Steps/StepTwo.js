// @flow
import React from 'react';
import { StepContainer, StepTitle, Red, SubTitle } from './StepOne';
import styled from 'styled-components';
import BabyEditForm from './BabyEditForm';

type Props = {
  babyRadio: mixed,
};

const Thanks = styled.h3`
  font-weight: 300;
  font-family: sans-serif;
  margin-bottom: 7px;
`;

const StepTwo = ({ babyRadio }: Props) => {
  const handleEditFormSubmit = () => {};

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
      <BabyEditForm babyRadio={babyRadio} onSubmit={handleEditFormSubmit} />
    </StepContainer>
  );
};

export default StepTwo;
