// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { Provider as Fela } from 'react-fela';

// Enhance Fela provider for universal base components.
export default class FelaProvider extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    Button: PropTypes.func.isRequired,
    Image: PropTypes.func.isRequired,
    Text: PropTypes.func.isRequired,
    TextInput: PropTypes.func.isRequired,
    View: PropTypes.func.isRequired,
    mountNode: PropTypes.object,
    renderer: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    Button: PropTypes.func,
    Image: PropTypes.func,
    Text: PropTypes.func,
    TextInput: PropTypes.func,
    View: PropTypes.func,
  };

  getChildContext() {
    const { Button, Image, Text, TextInput, View } = this.props;
    return { Button, Image, Text, TextInput, View };
  }

  render() {
    const { children, mountNode, renderer } = this.props;
    return (
      <Fela mountNode={mountNode} renderer={renderer}>
        {React.Children.only(children)}
      </Fela>
    );
  }
}
