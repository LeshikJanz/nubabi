// @flow
import React from 'react';
import { branch, renderComponent } from 'recompose';
import NoContentView from './NoContentView';

type TesterFn = (props: any) => boolean;

const showNoContentViewIf = (testerFn: TesterFn, Component: *) => {
  return branch(
    props => {
      if (props.data && props.data.loading) {
        return false;
      }
      return testerFn(props);
    },
    renderComponent(NoContentView),
    Component,
  );
};

export default showNoContentViewIf;
