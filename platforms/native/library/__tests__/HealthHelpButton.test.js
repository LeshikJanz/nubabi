import 'react-native';
import React from 'react';
import { Card } from '../../components';
import { Button } from '../HealthHelpButton';
import { expectRender, layoutTestProp } from '../../shared/testUtils';

test('it renders correctly', () => {
  const onPress = jest.fn();

  expectRender(
    <Card padding={0} onPress={onPress}>
      <Button layout={layoutTestProp} />
    </Card>,
  );
});
