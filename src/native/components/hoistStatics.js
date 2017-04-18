// Taken from recompose
import hoistNonReactStatics from 'hoist-non-react-statics';

const hoistStatics = higherOrderComponent =>
  BaseComponent => {
    const NewComponent = higherOrderComponent(BaseComponent);
    hoistNonReactStatics(NewComponent, BaseComponent);
    return NewComponent;
  };

export default hoistStatics;
