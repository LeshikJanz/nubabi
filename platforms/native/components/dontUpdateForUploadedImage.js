// @flow
import { curry, path } from 'ramda';
import { lifecycle } from 'recompose';

const uri = curry((propName, props) => path([propName, 'url'], props));

// $FlowFixMe$
export const dontUpdateForUploadedImage = curry((prop, component) => {
  return lifecycle({
    shouldComponentUpdate(nextProps) {
      const nextUri = uri(prop, nextProps);
      const prevUri = uri(prop, this.props);

      if (nextUri && prevUri) {
        if (
          nextUri.startsWith('http') &&
          (prevUri.startsWith('file://') || prevUri.startsWith('/'))
        ) {
          return false;
        }
      }

      return true;
    },
  })(component);
});

export default dontUpdateForUploadedImage;
