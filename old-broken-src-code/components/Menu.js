import { DrawerNavigator } from 'react-navigation';
import CircleOfFifthsScreen from './CircleOfFifthsScreen';
import { ReferencesContainer, PerfectFifthContainer, MusicalGravityContainer } from './References';
import { CompositionContainer } from './Composition';

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
  "    The Perfect Fifth": {
    screen: PerfectFifthContainer,
  },
  "    Musical Gravity": {
    screen: MusicalGravityContainer,
  },
  "    Rules for Chords": {
    screen: ReferencesContainer,
  },
  "    Enharmonic Equivalents": {
    screen: ReferencesContainer,
  },
  "    0": {
    screen: ReferencesContainer,
  },
  "    1": {
    screen: ReferencesContainer,
  },
  "    2": {
    screen: ReferencesContainer,
  },
  "    3": {
    screen: ReferencesContainer,
  },
  "    4": {
    screen: ReferencesContainer,
  },
  "    5": {
    screen: ReferencesContainer,
  },
  "    6": {
    screen: ReferencesContainer,
  },
  "    7": {
    screen: ReferencesContainer,
  },
  "    8": {
    screen: ReferencesContainer,
  },
  "    9": {
    screen: ReferencesContainer,
  },
});

export default RootDrawer;
