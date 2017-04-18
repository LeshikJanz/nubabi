import moment from 'moment';

export const required = value => {
  return value ? undefined : 'Required';
};

export const maxLength = max =>
  value => {
    return value && value.length > max
      ? `Must be ${max} characters or less`
      : undefined;
  };

export const minValue = min =>
  value => {
    return value && value < min ? `Must be at least ${min}` : undefined;
  };

export const maxValue = max =>
  value => {
    return value && value > max ? `Must be at most ${max}` : undefined;
  };

export const formattedDate = format =>
  value => {
    return value && moment(value, format).isValid()
      ? undefined
      : `Must be a date in ${format} format`;
  };

export const constantValues = (...constants) =>
  value => {
    return value && !constants.includes(value)
      ? `Must be one the values ${constants.join(',')}`
      : undefined;
  };
