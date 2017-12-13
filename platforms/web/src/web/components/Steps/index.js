// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Section } from 'web/elements';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

type Props = {};

type State = {
  step: number,
  stepOneInputs: Array<mixed>,
  babyRadio: mixed,
};

const StepsContainer = styled(Section)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Steps extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      step: 0,
      stepOneInputs: [
        {
          type: 'name',
          placeholder: 'Your full name',
          value: 'Savannah Cooper',
        },
        {
          type: 'email',
          placeholder: 'Email address',
          value: 'savannahcooper@gmail.com',
        },
        {
          type: 'password',
          placeholder: 'Nubabi password (at least 6 characters)',
          value: 'password',
        },
      ],
    };
  }

  onNexStep = () => this.setState({ step: this.state.step + 1 });

  onClickSignup = () => {};

  radioOnChange = value => {
    const babyRadio = Object.assign({}, this.state.babyRadio);
    babyRadio.current = value;
    this.setState({ babyRadio });
  };

  render() {
    return (
      <StepsContainer>
        {this.state.step === 0 ? (
          <StepOne
            inputs={this.state.stepOneInputs}
            onClickSignup={this.onClickSignup}
            onNexStep={this.onNexStep}
          />
        ) : (
          <StepTwo
            radioOnChange={this.radioOnChange}
            babyRadio={this.state.babyRadio}
          />
        )}
      </StepsContainer>
    );
  }
}

export default Steps;
