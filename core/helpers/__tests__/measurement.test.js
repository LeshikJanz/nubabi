import {
  convertMeasurements, toCentimeters, toInches, toKilograms,
  toPounds,
} from '../measurement';

describe('measurements helper', () => {
  describe('toPounds', () => {
    it('converts kilograms to pounds', () => {
      expect(toPounds(1)).toBeCloseTo(2.204);
      expect(toPounds(50)).toBeCloseTo(110.23);
    });
  });

  describe('toInches', () => {
    it('coverts cm to inches', () => {
      expect(toInches(1)).toBeCloseTo(0.39);
      expect(toInches(50)).toBeCloseTo(19.69);
    });
  });

  describe('toKilograms', () => {
    it('converts pounds to kilograms', () => {
      expect(toKilograms(1)).toBeCloseTo(0.45);
      expect(toKilograms(50)).toBeCloseTo(22.68);
    });
  });

  describe('toCentimeters', () => {
    it('converts inches to centimeteres', () => {
      expect(toCentimeters(1)).toBeCloseTo(2.54);
      expect(toCentimeters(5)).toBeCloseTo(12.7);
    });
  });

  describe('convertMeasurements', () => {
    it('converts a list of measurements to display units', () => {
      const fromCentimeters = convertMeasurements('in', [{ value: 1 }]);
      expect(fromCentimeters[0].value).toBeCloseTo(0.39);
    });

    it('has no effect on the default unit that is stored', () => {
      const value = 1;
      const fromKilograms = convertMeasurements('kg', [{value}]);
      const fromCentimeters = convertMeasurements('cm', [{ value }]);
      const fromInches = convertMeasurements('in', [{value}]);
      const fromPounds = convertMeasurements('lbs', [{value}]);

      [fromKilograms, fromCentimeters].forEach(result => {
        expect(result[0].value).toEqual(value);
      });

      [fromPounds, fromInches].forEach(result => {
        expect(result[0].value).not.toEqual(value);
      });
    })
  })
});
