import { Text } from 'react-native';
import React from 'react';
import showNoContentViewIf from '../showNoContentViewIf';
import { expectRender } from '../../shared/testUtils';

const Inner = () => <Text>The Component</Text>;
const Component = showNoContentViewIf(props => !props.someCollection)(Inner);

test('it renders a NoContentView if the tester fn does not satisfy', () => {
  expectRender(<Component />);
});

test('it renders the decorated component if the tester fn passes', () => {
  expectRender(<Component someCollection={[1, 2, 3]} />);
});
