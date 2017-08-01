import reducer, { initialState, toggleGalleryScroll } from '../reducer';

test('it has an initial state', () => {
  expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
});

test('handles TOGGLE_GALLERY_SCROLL_ENABLED', () => {
  expect(reducer(initialState, toggleGalleryScroll(true))).toMatchSnapshot();
  expect(reducer(initialState, toggleGalleryScroll(false))).toMatchSnapshot();
});
