// @flow
import React from 'react';
import { compose, withState } from 'recompose';

const Growth = () => <h1>Growth</h1>;

export default compose(withState('loading', 'handleLoading', true))(Growth);
