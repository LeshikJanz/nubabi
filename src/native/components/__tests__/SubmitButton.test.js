import 'react-native';
import React from 'react';
import SubmitButton from '../SubmitButton';
import { expectRender } from '../../shared/testUtils';

const onPress = jest.fn();

// Skipped until how to deal with mocking Animatable
test('it renders correctly by default', () => {
  expectRender(<SubmitButton loading={false} onPress={onPress} />);
});

test('it renders correctly with a custom text', () => {
  expectRender(<SubmitButton loading={false} submitText="LOGIN" />);
});

test('it renders an activity indicator when submitting', () => {
  expectRender(<SubmitButton loading />);
});
