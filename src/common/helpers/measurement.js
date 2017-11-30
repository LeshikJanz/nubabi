// @flow
import type { MeasurementUnit, Measurement } from '../types';
import { memoize, curry, map, evolve } from 'ramda';

export const DEFAULT_UNITS = {
  weight: 'kg',
  height: 'cm',
};

export function toPounds(value: number) {
  return value * 2.20462;
}

export function toInches(value: number) {
  return value * 0.393701;
}

export function toKilograms(value: number) {
  return value * 0.45359237;
}

export function toCentimeters(value: number) {
  return value * 2.54;
}

export const convertMeasurements = memoize(
  curry((unit: MeasurementUnit, data: Array<Measurement>) => {
    return map(evolve({ value: formatMeasurement(unit) }), data);
  }),
);

export const formatMeasurement = memoize(
  curry((unit: MeasurementUnit, value: number) => {
    let measurementValue = value;

    if (unit === 'in') {
      measurementValue = toInches(value);
    } else if (unit === 'lbs') {
      measurementValue = toPounds(value);
    }

    if (!Number.isInteger(measurementValue)) {
      return +measurementValue.toFixed(2);
    }

    return measurementValue;
  }),
);
