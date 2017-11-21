import 'react-native';
import React from 'react';
import { BrowseActivitiesButton } from '../BrowseActivitiesButton';
import layoutTestProp from '../../shared/layoutTestProp';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<BrowseActivitiesButton layout={layoutTestProp} />);

  expectRender(
    <BrowseActivitiesButton
      layout={layoutTestProp}
      image={{ url: 'http://example.com' }}
    />,
  );
});
