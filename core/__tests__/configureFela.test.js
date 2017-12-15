import configureFela from '../configureFela';

describe('configureFela', () => {
  it('allows to add a platform-specific renderer', () => {
    const renderer = jest.fn();
    const result = configureFela(renderer);
    expect(renderer).toHaveBeenCalled();
    expect(result).toHaveProperty('renderer');
    expect(result).toHaveProperty('ThemeProvider');
  });
});
