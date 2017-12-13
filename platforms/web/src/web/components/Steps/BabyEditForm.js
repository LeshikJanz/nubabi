// @flow
import React from 'react';
import { TextInput, Selector, InputWithRadio } from 'web/elements';
import { Field, reduxForm } from 'redux-form';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import BabyPhoto from './BabyPhoto';
import BabyRadio from './BabyRadio';
import { ButtonContainer, RedButton } from './StepOne';

const BabyInfoContainer = styled.form`
  display: flex;
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
  align-self: flex-end;
`;

type Props = {
  babyRadio: mixed,
  handleSubmit: Function,
};

/* eslint-disable import/no-mutable-exports */
let BabyEditForm = ({ babyRadio, handleSubmit }: Props) => (
  <BabyInfoContainer onSubmit={handleSubmit}>
    <Field name="babyPhoto" component={BabyPhoto} />

    <Field component={BabyRadio} name="babyRadio" babyRadio={babyRadio} />
    <InputsContainer>
      <Field component={TextInput} placeholder="name" name="name" type="text" />
      <Field
        component={TextInput}
        placeholder="born on"
        name="bornOn"
        type="text"
      />

      <Selector
        name="relationship"
        placeholder="My relationship"
        options={[
          { id: 1, value: 'Mother', label: 'Mother' },
          { id: 2, value: 'Father', label: 'Father' },
        ]}
      />

      <Field
        component={TextInput}
        name="weekBorn"
        help="test"
        placeholder="week baby born"
      />
      <InputWithRadio
        radioName="weightUnits"
        name="weight"
        type="number"
        variants={['kg', 'lbs']}
        placeholder="weight"
      />

      <InputWithRadio
        radioName="heightUnits"
        name="height"
        type="number"
        variants={['cm', 'in']}
        placeholder="height"
      />
    </InputsContainer>
    <StepTwoButtonContainer>
      <RedButton type="primary">DONE</RedButton>
    </StepTwoButtonContainer>
  </BabyInfoContainer>
);

BabyEditForm = reduxForm({
  form: 'BabyForm',
})(BabyEditForm);

export default BabyEditForm;
