import { createSelector } from 'reselect';
import { majorQualities, minorQualities, tonalGravity } from '../static/keySignatures';

// gets the 12 intervals of five related to the current key
export const fifthsGenerator = (key) => {
  // get root note's index
  const index = tonalGravity.findIndex(el => el.note === key);
  // gets the 12 notes that make up the fifth intervals starting at this root
  const notes = tonalGravity.filter((el, i) => {
    // these are the notes that are actually in this key/scale combo
    if(i >= index - 6 && i <= index + 5) {
      return el;
    } else {
      return null;
    }
  }).map(el => el.note);
  return notes;
}

// selector that will update component's that the selector is referenced in
// whenever the inputs to this function change
export const fifths = createSelector(
  state => state.keys.currentKey,
  (key) => fifthsGenerator(key),
);

// selector that will update component's that the selector is referenced in
// whenever the inputs to this function change
// returns the correct rotation angle to put the new root to the top
export const rotation = createSelector(
  state => state.keys.currentKey,
  state => fifths(state),
  (currentKey, fifthNotes) => {
    // multiplier is essentially the number of wedges away from the first wedge we currently are
    const multiplier = fifthNotes.length - 1 - fifthNotes.findIndex(el => el === currentKey);
    // get the angle we need to rotate to
    const angle = (multiplier * 30) + 15;
    return angle;
  },
);
