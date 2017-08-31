// @flow
import React, { PureComponent } from 'react';
import { Overlay, Box } from '../components';
import Loader from '../components/RocketHorseLoader';
import theme from '../../common/themes/defaultTheme';

type Props = {
  isLoading?: boolean,
  children: any,
};

export class ActivityContainer extends PureComponent {
  props: Props;

  render() {
    const { isLoading = false, children } = this.props;

    return isLoading
      ? <Overlay overlayStyle={{ flex: 1, zIndex: 999 }}>
          <Box
            style={() => ({
              zIndex: 1000,
              flex: 1,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <Loader style={{ backgroundColor: theme.colors.primary }} />
          </Box>
          {children}
        </Overlay>
      : <Box flex={1}>
          {children}
        </Box>;
  }
}

export default ActivityContainer;
