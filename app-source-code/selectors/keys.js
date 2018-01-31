import { createSelector } from 'reselect';
import _ from 'lodash';
import { keySignatures } from '../static/keySignatures';

export const getKeyObject = createSelector(
	state => state.keys.currentKey,
	state => state.keys.scale,
	(key, scale) => _.get(keySignatures, `${key}.${scale}`),
);

export const getParallelKey = createSelector(
	state => state.keys.currentKey,
	state => state.keys.scale,
	(currentKey, currentScale) =>
		(currentScale === 'maj' ? _.get(keySignatures, `${currentKey}.min`) : _.get(keySignatures, `${currentKey}.maj`)),
);

export const getRelativeKey = createSelector(
	getKeyObject,
	key => _.get(keySignatures, key.relative),
);
