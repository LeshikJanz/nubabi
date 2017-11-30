// @flow
import type { LineArgs } from '../../common/components/graphUtils';
import React, { Component } from 'react';
import { ART, Dimensions, StyleSheet, View, Text } from 'react-native';
import * as graphUtils from '../../common/components/graphUtils';
import theme from '../../common/themes/defaultTheme';

const { Group, Shape, Surface, Path } = ART;

const dimensionWindow = Dimensions.get('window');
const PADDING_SIZE = 20;
const TICK_WIDTH = PADDING_SIZE * 2;

type ColorProps = {
  fillColor: string,
  strokeColor: string,
};

type TickProps = {
  withLegend?: boolean,
  formatTickX?: (value: Date) => string,
  formatTickY?: (value: number) => string,
};

type Props = LineArgs<*> & ColorProps & TickProps;

export class LineGraph extends Component {
  props: Props;

  static defaultProps = {
    width: Math.round(dimensionWindow.width * 0.9),
    height: Math.round(dimensionWindow.height * 0.5),
  };

  state = {
    graphWidth: 0,
    graphHeight: 0,
    lineGraph: {
      path: '',
      ticks: [],
    },
  };

  componentWillMount() {
    this.computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.computeNextState(nextProps);
  }

  computeNextState(nextProps: Props) {
    const { data, width, height, xAccessor, yAccessor } = nextProps;

    const graphWidth = width;
    const graphHeight = height;

    const lineGraph = graphUtils.createAreaGraph({
      data,
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
    });

    this.setState({
      graphWidth,
      graphHeight,
      lineGraph,
    });
  }

  renderTicks() {
    const { ticks, scale } = this.state.lineGraph;
    const { xAccessor, yAccessor, formatTickX, formatTickY } = this.props;

    return [
      <View key="ticks-X" style={styles.ticksXContainer}>
        {scale.x.ticks().map((tick, index) => {
          return (
            <Text key={index} style={styles.tickLabelX}>
              {formatTickX(tick)}
            </Text>
          );
        })}
      </View>,
      <View key="ticksY" style={styles.ticksYContainer}>
        {ticks.map((tick, index) => {
          const value = yAccessor(tick.datum);

          const tickStyles = {};
          tickStyles.width = TICK_WIDTH;
          // tickStyles.left = tick.x - Math.round(TICK_WIDTH * 0.5);

          tickStyles.top = tick.y + 2 - Math.round(TICK_WIDTH * 0.65);

          return (
            <View key={index} style={[styles.tickLabelY, tickStyles]}>
              <Text style={styles.tickLabelYText}>{formatTickY(value)}</Text>
            </View>
          );
        })}
      </View>,
    ];
  }

  renderLines() {
    const { xAccessor } = this.props;
    return this.state.lineGraph.ticks.map(tick => {
      const line = new Path().lineTo(0, this.state.graphHeight);

      return (
        <Group key={`line-${xAccessor(tick.datum)}`} x={tick.x} y={tick.y + 5}>
          <Shape d={line} strokeWidth={1} stroke="rgba(255,255,255,0.21)" />
        </Group>
      );
    });
  }

  renderCircles() {
    const circlePath = graphUtils.circle();
    const { xAccessor } = this.props;

    return this.state.lineGraph.ticks.map(tick => {
      return (
        <Group key={`circle-${xAccessor(tick.datum)}`} x={tick.x} y={tick.y}>
          <Shape
            d={circlePath}
            strokeWidth={2}
            stroke="white"
            fill={this.props.fillColor}
          />
        </Group>
      );
    });
  }

  render() {
    const { graphWidth, graphHeight, lineGraph } = this.state;
    let width = graphWidth;
    let height = graphHeight;

    const { withLegend, strokeColor, fillColor } = this.props;

    if (withLegend) {
      width -= PADDING_SIZE * 2;
      height -= PADDING_SIZE * 2;
    }

    return (
      <View>
        <Surface width={width} height={height}>
          <Shape d={lineGraph.path} stroke={strokeColor} fill={fillColor} />
          {this.renderLines()}
          {this.renderCircles()}
        </Surface>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  ticksXContainer: {
    flexDirection: 'row',
  },
  ticksYContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },

  tickLabelY: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'transparent',
  },

  tickLabelYText: {
    fontSize: 12,
    textAlign: 'center',
  },
  tickLabelX: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.colors.secondary,
  },
});
