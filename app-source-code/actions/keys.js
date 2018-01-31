export const KEY_CHANGE = 'KEY_CHANGE';
export const SCALE_CHANGE = 'SCALE_CHANGE';
export const changeKey = newKey => ({ type: KEY_CHANGE, newKey });
export const changeScale = scale => ({ type: SCALE_CHANGE, scale });
