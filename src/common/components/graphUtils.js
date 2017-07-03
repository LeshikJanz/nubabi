// @flow
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
  shape,
  scale,
};

export type Timestamp = number;

export type LineArgs<T> = {
  data: [T],
  xAccessor: (T) => Timestamp, // prettier-ignore
  yAccessor: (T) => number, // prettier-ignore
  width: number,
  height: number,
};

function createScaleX(start: Timestamp, end: Timestamp, width: number) {
  return d3.scale
    .scaleTime()
    .domain([new Date(start), new Date(end)])
    .range([0, width]);
}

function createScaleY(minY: number, maxY: number, height: number) {
  return (
    d3.scale
      .scaleLinear()
      .domain([minY, maxY])
      .nice()
      // We invert our range so it outputs using the axis that React uses
      .range([height, 0])
  );
}

export function createLineGraph({
  data,
  xAccessor,
  yAccessor,
  width,
  height,
}: LineArgs<*>) {
  const lastDatum = data[data.length - 1];

  const scaleX = createScaleX(xAccessor(data[0]), xAccessor(lastDatum), width);

  // Collect all Y values
  const allYValues = data.reduce((all, datum) => {
    all.push(yAccessor(datum));
    return all;
  }, []);

  // Get the min and max value
  const extentY = d3Array.extent(allYValues);

  const scaleY = createScaleY(extentY[0], extentY[1], height);

  // Use the d3-shape line generator to create the `d={}` attribute value.
  const lineShape = d3.shape
    .line()
    .x(d => scaleX(xAccessor(d)))
    .y(d => scaleY(yAccessor(d)));

  return {
    data,
    scale: {
      x: scaleX,
      y: scaleY,
    },
    path: lineShape(data),
    ticks: data.map(datum => {
      const time = xAccessor(datum);
      const value = yAccessor(datum);

      return {
        x: scaleX(time),
        y: scaleY(value),
        datum,
      };
    }),
  };
}

export function createAreaGraph({
  data,
  xAccessor,
  yAccessor,
  width,
  height,
}: LineArgs<*>) {
  const lastDatum = data[data.length - 1];

  const scaleX = createScaleX(xAccessor(data[0]), xAccessor(lastDatum), width);

  // Collect all Y values
  const allYValues = data.reduce((all, datum) => {
    all.push(yAccessor(datum));
    return all;
  }, []);

  // Get the min and max value
  const extentY = d3Array.extent(allYValues);

  const scaleY = createScaleY(extentY[0], extentY[1], height);

  // Use the d3-shape line generator to create the `d={}` attribute value.
  const lineShape = d3.shape
    .area()
    .x(d => scaleX(xAccessor(d)))
    .y0(scaleY(0))
    .y1(d => scaleY(yAccessor(d)))
    .curve(d3.shape.curveMonotoneX);

  return {
    data,
    scale: {
      x: scaleX,
      y: scaleY,
    },
    path: lineShape(data),
    ticks: data.map(datum => {
      const time = xAccessor(datum);
      const value = yAccessor(datum);

      return {
        x: scaleX(time),
        y: scaleY(value),
        datum,
      };
    }),
  };
}

export function renderLine(x: number, y: number) {
  return d3.shape.line().x(x).y(y);
}

export const circle = d3.shape.symbol();
