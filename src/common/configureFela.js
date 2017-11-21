// @flow
import { ThemeProvider } from 'react-fela';

const configureFela = createRenderer => {
  const renderer = createRenderer();

  return {
    ThemeProvider,
    renderer,
  };
};

export default configureFela;
