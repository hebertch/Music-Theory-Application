import { KEY_CHANGE, SCALE_CHANGE, TOGGLE_PARALLEL, TOGGLE_RELATIVE } from '../actions/keys';

const reducer = (state = {
  currentKey: 'C',
  scale: 'maj',
  showParallel: false,
  showRelative: false,
}, action) => {
  switch (action.type) {
    // updates state with new key value
    case KEY_CHANGE: {
      //map key to an acceptable one if it's above F# or below Gb
      let key = action.newKey;
      switch (key) {
        case 'Cx' : {
          key = 'D';
          break;
        }
        case 'Fx' : {
          key = 'G';
          break;
        }
        case 'B♯' : {
          key = 'C';
          break;
        }
        case 'E♯' : {
          key = 'F';
          break;
        }
        case 'A♯' : {
          key = 'B♭';
          break;
        }
        case 'D♯' : {
          key = 'E♭';
          break;
        }
        case 'G♯' : {
          key = 'A♭';
          break;
        }
        case 'C♯' : {
          key = 'D♭';
          break;
        }
        case 'C♭' : {
          key = 'B';
          break;
        }
        case 'F♭' : {
          key = 'E';
          break;
        }
        case 'B♭♭' : {
          key = 'A';
          break;
        }
        case 'E♭♭' : {
          key = 'D';
          break;
        }
        default:
          break;
      }
      return Object.assign({}, state, { currentKey: key });
    }
    // updates state with new scale value
    case SCALE_CHANGE: {
      return Object.assign({}, state, { scale: action.scale });
    }
    // toggles parallel value in state
    case TOGGLE_PARALLEL: {
      return Object.assign({}, state, { showParallel: action.shouldShow });
    }
    // toggles relative value in state
    case TOGGLE_RELATIVE: {
      return Object.assign({}, state, { showRelative: action.shouldShow });
    }
    default:
      return state;
  }
};

export default reducer;
