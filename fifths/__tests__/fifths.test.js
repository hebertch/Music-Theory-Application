import { fifthsGenerator } from '../src/selectors/keys';

// ♭ ♯
// F# is the highest note that we need fifths for
// Gb is the lowest note that we need fifths for
// The below test cases make sure that we get the correct
// output for all of the notes between and including F# and Gb

test('Key of F# should return fifths B#E#A#D#G#C#F#BEADG', () => {
  const returnArray = ['B♯', 'E♯', 'A♯', 'D♯', 'G♯', 'C♯', 'F♯', 'B', 'E', 'A', 'D', 'G'];
  expect(fifthsGenerator('F♯')).toEqual(returnArray);
});

test('Key of B should return fifths E#A#D#G#C#F#BEADGC', () => {
  const returnArray = ['E♯', 'A♯', 'D♯', 'G♯', 'C♯', 'F♯', 'B', 'E', 'A', 'D', 'G', 'C'];
  expect(fifthsGenerator('B')).toEqual(returnArray);
});

test('Key of E should return fifths A#D#G#C#F#BEADGCF', () => {
  const returnArray = ['A♯', 'D♯', 'G♯', 'C♯', 'F♯', 'B', 'E', 'A', 'D', 'G', 'C', 'F'];
  expect(fifthsGenerator('E')).toEqual(returnArray);
});

test('Key of A should return fifths D#G#C#F#BEADGCFBb', () => {
  const returnArray = ['D♯', 'G♯', 'C♯', 'F♯', 'B', 'E', 'A', 'D', 'G', 'C', 'F', 'B♭'];
  expect(fifthsGenerator('A')).toEqual(returnArray);
});

test('Key of D should return fifths G#C#F#BEADGCFBbEb', () => {
  const returnArray = ['G♯', 'C♯', 'F♯', 'B', 'E', 'A', 'D', 'G', 'C', 'F', 'B♭', 'E♭'];
  expect(fifthsGenerator('D')).toEqual(returnArray);
});

test('Key of G should return fifths C#F#BEADGCFBbEbAb', () => {
  const returnArray = ['C♯', 'F♯', 'B', 'E', 'A', 'D', 'G', 'C', 'F', 'B♭', 'E♭', 'A♭'];
  expect(fifthsGenerator('G')).toEqual(returnArray);
});

test('Key of C should return fifths F#BEADGCFBbEbAbDb', () => {
  const returnArray = ['F♯', 'B', 'E', 'A', 'D', 'G', 'C', 'F', 'B♭', 'E♭', 'A♭', 'D♭'];
  expect(fifthsGenerator('C')).toEqual(returnArray);
});

test('Key of F should return fifths BEADGCFBbEbAbDbGb', () => {
  const returnArray = ['B', 'E', 'A', 'D', 'G', 'C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭'];
  expect(fifthsGenerator('F')).toEqual(returnArray);
});

test('Key of Bb should return fifths EADGCFBbEbAbDbGbCb', () => {
  const returnArray = ['E', 'A', 'D', 'G', 'C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'];
  expect(fifthsGenerator('B♭')).toEqual(returnArray);
});

test('Key of Eb should return fifths ADGCFBbEbAbDbGbCbFb', () => {
  const returnArray = ['A', 'D', 'G', 'C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭'];
  expect(fifthsGenerator('E♭')).toEqual(returnArray);
});

test('Key of Ab should return fifths DGCFBbEbAbDbGbCbFbBbb', () => {
  const returnArray = ['D', 'G', 'C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭', 'B♭♭'];
  expect(fifthsGenerator('A♭')).toEqual(returnArray);
});

test('Key of Db should return fifths GCFBbEbAbDbGbCbFbBbbEbb', () => {
  const returnArray = ['G', 'C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭', 'B♭♭', 'E♭♭'];
  expect(fifthsGenerator('D♭')).toEqual(returnArray);
});

test('Key of Gb should return fifths CFBbEbAbDbGbCbFbBbbEbbAbb', () => {
  const returnArray = ['C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭', 'F♭', 'B♭♭', 'E♭♭', 'A♭♭'];
  expect(fifthsGenerator('G♭')).toEqual(returnArray);
});

