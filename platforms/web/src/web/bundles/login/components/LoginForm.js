// @flow
import React from 'react';
import { Form } from 'web/elements';
import { required } from 'web/utils/validation';
import { ButtonsBox } from '../styled';

type Props = {
  handleSubmit: Function,
  pristine: boolean,
  submitting: boolean,
  reset: Function,
};

export const LoginForm = ({
  handleSubmit,
  pristine,
  submitting,
  reset,
}: Props) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Form.Label>Username</Form.Label>
        <Form.TextInput
          name="username"
          placeholder="Username"
          validate={[required]}
        />
      </Form.Field>
      <Form.Field>
        <Form.Label>Password</Form.Label>
        <Form.PasswordInput name="password" placeholder="Password" />
      </Form.Field>
      <ButtonsBox>
        <Form.SubmitButton pristine={pristine} submitting={submitting} p={2}>
          Login
        </Form.SubmitButton>
        <Form.ClearButton
          pristine={pristine}
          submitting={submitting}
          onClick={reset}
        >
          Clear
        </Form.ClearButton>
      </ButtonsBox>
    </Form>
  );
};

export default LoginForm;
