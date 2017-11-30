// @flow
import type { GraphDetailMeasurementSwitcherControlProps } from './GraphDetailMeasurementSwitcher';
import React, { PureComponent } from 'react';
import { SegmentedControlIOS } from 'react-native';
import { upperFirst } from 'lodash/fp';
import theme from '../../common/themes/defaultTheme';

type Props = GraphDetailMeasurementSwitcherControlProps;

class GraphDetailHeaderSwitcher extends PureComponent {
  props: Props;

  handleSwitch = (type: string) => {
    this.props.onChange(type.toLowerCase());
  };

  render() {
    const { values, current } = this.props;
    const currentIndex = values.indexOf(current);

    return (
      <SegmentedControlIOS
        values={values.map(upperFirst)}
        selectedIndex={currentIndex}
        tintColor={theme.colors.white}
        onValueChange={this.handleSwitch}
        style={{ height: 35 }}
      />
    );
  }
}

export default GraphDetailHeaderSwitcher;
