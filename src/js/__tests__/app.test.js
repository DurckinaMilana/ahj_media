/* eslint-disable linebreak-style */
import Timeline from '../Timeline';

const timeline = new Timeline();
describe('test getCoords', () => {
  const expected = { latitude: 51.50851, longitude: -0.12572 };
  test('test 1', () => {
    expect(timeline.getCoords('51.50851, -0.12572')).toEqual(expected);
  });
  test('test 2', () => {
    expect(timeline.getCoords('51.50851,-0.12572')).toEqual(expected);
  });
  test('test 3', () => {
    expect(timeline.getCoords('[51.50851, -0.12572]')).toEqual(expected);
  });
});
describe('test error getCoords', () => {
  test('error', () => {
    expect(() => timeline.getCoords('(51.50851, -0.12572)')).toThrowError(new Error('Неправильные координаты'));
  });
});
