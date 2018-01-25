import { DrawerNavigator } from 'react-navigation';
import CofContainer from '../CofContainer';
import { ReferencesContainer } from '../References';
import { CompositionContainer } from '../Composition';

const RootDrawer = DrawerNavigator({
  Home: {
    screen: CofContainer,
  },
  References: {
    screen: ReferencesContainer
  },
  Compose: {
    screen: CompositionContainer
  },
});

export default RootDrawer;
