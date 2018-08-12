import { KEY_CHANGE, SCALE_CHANGE, TOGGLE_PARALLEL, TOGGLE_RELATIVE } from '../actions/keys';

// dependent is either 'maj', 'min', or undefined
const mapKey = (key, dependent = undefined) => {
 const returnKey = String(Number(key.charAt(0)) + 1);
 console.log(returnKey);
};

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
      mapKey(key);
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
          if (state.scale === 'maj')
            key = 'E♭';
          break;
        }
        case 'G♯' : {
          if (state.scale === 'maj')
            key = 'A♭';
          break;
        }
        case 'C♯' : {
          if (state.scale === 'maj')
            key = 'D♭';
          break;
        }
        case 'A♭' : {
          if (state.scale === 'min')
            key = 'G♯';
          break;
        }
        case 'D♭' : {
          if (state.scale === 'min')
            key = 'C♯';
          break;
        }
        case 'G♭' : {
          if (state.scale === 'min')
            key = 'F♯';
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
        case 'A♭♭' : {
          key = 'G';
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
