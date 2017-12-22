// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Section } from 'web/elements';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import { REGISTER_STEP_ONE_INPUTS } from 'web/constants';

type Props = {};

type State = {
  step: number,
  babyRadio: string,
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
      babyRadio: 'FEMALE',
    };
  }

  onNexStep = () => this.setState({ step: this.state.step + 1 });

  onClickSignup = () => {};

  radioOnChange = (value: string) => {
    const babyRadio = Object.assign({}, this.state.babyRadio);
    babyRadio.current = value;
    this.setState({ babyRadio });
  };

  render() {
    return (
      <StepsContainer>
        {this.state.step === 0 ? (
          <StepOne
            inputs={REGISTER_STEP_ONE_INPUTS}
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
