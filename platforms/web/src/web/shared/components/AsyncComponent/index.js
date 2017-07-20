import React, { Component } from "react";
import Components from "web/shared/components";

const AsyncComponent = getComponent => {
  return class AsyncComponent extends Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return <Components.Loader active={true} />;
    }
  };
};

export default AsyncComponent;
