// @flow
import type { LineArgs } from '../../common/components/graphUtils';
import React, { Component } from 'react';
import { ART, Dimensions, StyleSheet, View } from 'react-native';
import * as graphUtils from '../../common/components/graphUtils';

const { Group, Shape, Surface, Path } = ART;

const dimensionWindow = Dimensions.get('window');
const PADDING_SIZE = 20;

type ColorProps = {
  fillColor: string,
  strokeColor: string,
};

type Props = LineArgs<*> & ColorProps;

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

  renderLines() {
    return this.state.lineGraph.ticks.map(tick => {
      const line = new Path().lineTo(0, this.state.graphHeight);

      return (
        <Group key={`line-${tick.datum.timestamp}`} x={tick.x} y={tick.y + 5}>
          <Shape d={line} strokeWidth={1} stroke="rgba(255,255,255,0.21)" />
        </Group>
      );
    });
  }

  renderCircles() {
    const circlePath = graphUtils.circle();

    return this.state.lineGraph.ticks.map(tick => {
      return (
        <Group key={`circle-${tick.datum.timestamp}`} x={tick.x} y={tick.y}>
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

    const { strokeColor, fillColor } = this.props;

    return (
      <View style={styles.container}>
        <Surface width={graphWidth} height={graphHeight}>
          <Group x={0} y={0}>
            <Shape d={lineGraph.path} stroke={strokeColor} fill={fillColor} />
          </Group>
          {this.renderCircles()}
          {this.renderLines()}
        </Surface>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
