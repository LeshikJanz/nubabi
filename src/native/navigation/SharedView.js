/* eslint-disable */
// See comments on MaterialSharedElementTransitioner.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, UIManager, findNodeHandle } from 'react-native';

import { SharedItem } from './transitioners/SharedItems';

class SharedView extends Component {
  _view: any;
  static contextTypes = {
    registerSharedView: PropTypes.func,
    unregisterSharedView: PropTypes.func,
  };

  render() {
    // collapsable={false} is required for UIManager.measureInWindow to get the actual measurements
    // instead of undefined, see https://github.com/facebook/react-native/issues/9382
    return (
      <View collapsable={false} ref={c => (this._view = c)}>
        {this.props.children}
      </View>
    );
  }

  componentDidMount() {
    const { registerSharedView } = this.context;
    if (!registerSharedView) return;

    const { name, containerRouteName } = this.props;
    const nativeHandle = findNodeHandle(this._view);
    registerSharedView(
      new SharedItem(
        name,
        containerRouteName,
        React.Children.only(this.props.children),
        nativeHandle,
      ),
    );
  }

  componentWillUnmount() {
    const { unregisterSharedView } = this.context;
    if (!unregisterSharedView) return;

    const { name, containerRouteName } = this.props;
    unregisterSharedView(name, containerRouteName);
  }
}

export default SharedView;
/* eslint-enable */
