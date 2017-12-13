// @flow
import React from 'react';
import { TextInput, Selector, InputWithRadio } from 'web/elements';
import { Field, reduxForm } from 'redux-form';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import BabyPhoto from './BabyPhoto';
import BabyRadio from './BabyRadio';
import { ButtonContainer, RedButton } from './StepOne';
import { required } from '../../utils/validation';

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
  align-self: flex-end;
`;

type Props = {
  handleSubmit: Function,
  invalid: boolean,
};

/* eslint-disable import/no-mutable-exports */
let BabyEditForm = ({ handleSubmit, invalid }: Props) => (
  <form onSubmit={handleSubmit}>
    <BabyInfoContainer>
      <Field name="babyPhoto" component={BabyPhoto} />

      <Field component={BabyRadio} name="gender" validate={required} />
      <InputsContainer>
        <Field
          component={TextInput}
          placeholder="name"
          validate={required}
          name="name"
          type="text"
        />
        <Field
          component={TextInput}
          placeholder="born on"
          name="dob"
          validate={required}
          type="date"
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
          type="number"
          help="test"
          validate={required}
          placeholder="week baby born"
        />
        <InputWithRadio
          radioName="weightUnits"
          name="weight"
          type="number"
          validate={required}
          variants={['kg', 'lbs']}
          placeholder="weight"
        />

        <InputWithRadio
          radioName="heightUnits"
          name="height"
          type="number"
          validate={required}
          variants={['cm', 'in']}
          placeholder="height"
        />
      </InputsContainer>
    </BabyInfoContainer>

    <StepTwoButtonContainer>
      <RedButton type="primary" disabled={invalid}>
        DONE
      </RedButton>
    </StepTwoButtonContainer>
  </form>
);

BabyEditForm = reduxForm({
  form: 'BabyForm',
})(BabyEditForm);

export default BabyEditForm;
