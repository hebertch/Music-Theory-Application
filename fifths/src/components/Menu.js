import { DrawerNavigator } from 'react-navigation';
import CircleOfFifthsScreen from './CircleOfFifthsScreen';
import { ReferencesContainer, CircleOfFifthsReferenceContainer } from './References';
import CompositionContainer from './Composition';

const RootDrawer = DrawerNavigator({
  Home: {
    screen: CircleOfFifthsScreen,
  },
  Compose: {
    screen: CompositionContainer,
  },
  References: {
    screen: ReferencesContainer,
  },
  "    Circle of Fifths": {
    screen: CircleOfFifthsReferenceContainer,
  },
});

export default RootDrawer;
