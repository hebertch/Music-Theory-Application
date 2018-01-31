import { KEY_CHANGE, SCALE_CHANGE } from '../actions/keys';

const reducer = (state = { currentKey: 'c', scale: 'maj' }, action) => {
	switch (action.type) {
	case KEY_CHANGE: {
		return Object.assign({}, state, { currentKey: action.newKey });
	}
	case SCALE_CHANGE: {
		return Object.assign({}, state, { scale: action.scale });
	}
	default:
		return state;
	}
};

export default reducer;
