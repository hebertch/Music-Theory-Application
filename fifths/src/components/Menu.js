import React from 'react';
import { Text } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import CircleOfFifthsScreen from './CircleOfFifthsScreen';
import { 
  ReferencesContainer, CircleOfFifthsReferenceContainer, PerfectFifthReferenceContainer,
MusicalGravityReferenceContainer, HarmonicFunctionReferenceContainer, KeySignaturesReferenceContainer, DiatonicReferenceContainer, TonalGravityReferenceContainer, ParallelAndBorrowedReferenceContainer, EnharmonicEquivalentsReferenceContainer, ScaleDegreeReferenceContainer, DominantChordsReferenceContainer, SecondaryDominantsReferenceContainer, DiatonicSubstitutesReferenceContainer
} from './References';
import CompositionContainer from './Composition';

const ComposeStack = StackNavigator({
  Compose: {
      screen: CompositionContainer,
      navigationOptions: ({ navigation }) => ({
	  title: 'Compose',  // Title to appear in status bar
	  headerLeft: <Text onPress={ () => navigation.navigate('DrawerOpen') }>Menu</Text>
      })
  }
});

const RootDrawer = DrawerNavigator({
  Home: {
    screen: CircleOfFifthsScreen,
  },
  Compose: {
    screen: ComposeStack,
  },
  References: {
    screen: ReferencesContainer,
  },
  "    Circle of Fifths": {
    screen: CircleOfFifthsReferenceContainer,
  },
  "    The Perfect Fifth": {
    screen: PerfectFifthReferenceContainer,
  },
  "    Musical Gravity": {
    screen: MusicalGravityReferenceContainer,
  },
  "    Harmonic Function": {
    screen: HarmonicFunctionReferenceContainer,
  },
  "    Keys and Key Signatures": {
    screen: KeySignaturesReferenceContainer,
  },
  "    Diatonic": {
    screen: DiatonicReferenceContainer,
  },
  "    Schedule of Tonal Gravity": {
    screen: TonalGravityReferenceContainer,
  },
  "    Parallel Keys and Borrowed Chords": {
    screen: ParallelAndBorrowedReferenceContainer,
  },
  "    Enharmonic Equivalents": {
    screen: EnharmonicEquivalentsReferenceContainer,
  },
  "    Scale Degree and Function": {
    screen: ScaleDegreeReferenceContainer,
  },
  "    Dominant Chords": {
    screen: DominantChordsReferenceContainer,
  },
  "    Secondary Dominants": {
    screen: SecondaryDominantsReferenceContainer,
  },
  "    Diatonic Substitutes": {
    screen: DiatonicSubstitutesReferenceContainer,
  },
});

export default RootDrawer;
