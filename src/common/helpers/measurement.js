// @flow
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

export function formatMeasurement(value: number) {
  if (!Number.isInteger(value)) {
    return +value.toFixed(2);
  }

  return value;
}
