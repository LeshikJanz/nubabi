// @flow
import testRenderer from 'react-test-renderer';
import felaTestContext, { renderer as felaRenderer } from './felaTestContext';

const felaNativeToStyleObject = cache => {
  return Object.keys(cache).reduce((acc, key) => {
    return { ...acc, ...JSON.parse(key) };
  }, {});
};

export const createTestRenderer = () => (Component: any) => {
  const component = testRenderer.create(felaTestContext(Component));

  const snapshot = component.toJSON();
  snapshot.felaRules = felaNativeToStyleObject(felaRenderer.cache);

  return snapshot;
};

export const createExpectRender = () => {
  const render = createTestRenderer();
  return (Component: any) => {
    expect(render(Component)).toMatchSnapshot();
  };
};

export const expectRender = createExpectRender();

export const layoutTestProp = {
  fontScale: 2,
  height: 1334,
  scale: 2,
  width: 750,
  viewportWidth: 750,
  viewportHeight: 1334,
  parentWidth: 350,
  parentHeight: 200,
};
