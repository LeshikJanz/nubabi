import 'react-native';
import React from 'react';
import RelationshipDropdown from '../RelationshipDropdown';
import { expectRender } from '../../../shared/testUtils';

test('it renders correctly', () => {
  const onChange = jest.fn();
  const field = {
    input: {
      onChange,
      value: 'Parent',
    },
  };

  expectRender(<RelationshipDropdown field={field} />);
});
