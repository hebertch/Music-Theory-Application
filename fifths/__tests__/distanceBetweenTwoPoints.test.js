import distanceBetweenTwoPoints from '../src/util/geometry.js';

test('finds distance between two points (1,0) and (3,0)', () => {
  expect(distanceBetweenTwoPoints({ X: 1, Y: 0 }, { X: 3, Y: 0 })).toBe(2);
});

