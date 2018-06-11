import React from 'react';
import { Text } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import CircleOfFifthsScreen from './CircleOfFifthsScreen';
import { 
    ReferencesContainer, CircleOfFifthsReferenceContainer, PerfectFifthReferenceContainer,
    MusicalGravityReferenceContainer, HarmonicFunctionReferenceContainer, KeySignaturesReferenceContainer, DiatonicReferenceContainer, TonalGravityReferenceContainer, ParallelAndBorrowedReferenceContainer, EnharmonicEquivalentsReferenceContainer, ScaleDegreeReferenceContainer, DominantChordsReferenceContainer, SecondaryDominantsReferenceContainer, DiatonicSubstitutesReferenceContainer, TritoneSubstitutesReferenceContainer
} from './References';
import CompositionContainer from './Composition';

// StackNavigators are used to create a title-bar, with a centered title, and a Menu button that opens the side menu.
// Each Screen must be wrapped in a stack navigator.
const CircleOfFifthsStack = StackNavigator({
    Home: {
	screen: CircleOfFifthsScreen,
	navigationOptions: ({ navigation }) => ({
	    title: 'Home',  // Title to appear in status bar
	    headerLeft: <Text style={{ marginLeft: 5 }} onPress={ () => navigation.navigate('DrawerOpen') }>Menu</Text>
	})
    }
});

const ComposeStack = StackNavigator({
    Compose: {
	screen: CompositionContainer,
	navigationOptions: ({ navigation }) => ({
	    title: 'Compose',  // Title to appear in status bar
	    headerLeft: <Text style={{ marginLeft: 5 }} onPress={ () => navigation.navigate('DrawerOpen') }>Menu</Text>
	})
    }
});

// All reference pages share the same title: 'References', since they are really part of the same page.
// reference_stack() creates a StackNavigator for a reference page.
const reference_stack = function(screen_name, container) {
    var params = {};
    params[screen_name] = {
	screen: container,
	navigationOptions: ({ navigation }) => ({
	    title: 'References',
	    headerLeft: <Text style={{ marginLeft: 5 }} onPress={ () => navigation.navigate('DrawerOpen') }>Menu</Text>
	})
    };
    return StackNavigator(params);
}

// Creates the side menu for navigating through the app.
const RootDrawer = DrawerNavigator({
    Home: {
	screen: CircleOfFifthsStack,
    },
    Compose: {
	screen: ComposeStack,
    },
    References: {
	screen: reference_stack('References', ReferencesContainer),
	title: 'References'
    },
    "The Perfect Fifth": {
	screen: reference_stack("    The Perfect Fifth", PerfectFifthReferenceContainer),
	navigationOptions: {
	    title: "        The Perfect Fifth"
	}
    },
    "Musical Gravity": {
	screen: reference_stack("    Musical Gravity", MusicalGravityReferenceContainer),
	navigationOptions: {
	    title: "        Musical Gravity"
	}
	},
    "Circle of Fifths": {
	screen: reference_stack('    Circle of Fifths', CircleOfFifthsReferenceContainer),
	navigationOptions: {
		title: '        Circle of Fifths'
	}
	},
    "Harmonic Function": {
	screen: reference_stack("    Harmonic Function", HarmonicFunctionReferenceContainer),
	navigationOptions: {
	    title: "        Harmonic Function"
	}
    },
    "Keys and Key Signatures": {
	screen: reference_stack("    Keys and Key Signatures", KeySignaturesReferenceContainer),
	navigationOptions: {
	    title: "        Keys and Key Signatures"
	}
    },
    "Diatonic": {
	screen: reference_stack("    Diatonic", DiatonicReferenceContainer),
	navigationOptions: {
	    title: "        Diatonic"
	}
    },
    "Tonal Gravity": {
	screen: reference_stack("    Tonal Gravity", TonalGravityReferenceContainer),
	navigationOptions: {
	    title: "        Tonal Gravity"
	}
    },
    "Parallel Keys and Borrowed Chords": {
	screen: reference_stack("    Parallel Keys and Borrowed Chords", ParallelAndBorrowedReferenceContainer),
	navigationOptions: {
	    title: "        Parallel Keys and Borrowed Chords"
	}
    },
    "Enharmonic Equivalents": {
	screen: reference_stack("    Enharmonic Equivalents", EnharmonicEquivalentsReferenceContainer),
	navigationOptions: {
	    title: "        Enharmonic Equivalents"
	}
    },
    "Scale Degree and Function": {
	screen: reference_stack("    Scale Degree and Function", ScaleDegreeReferenceContainer),
	navigationOptions: {
	    title: "        Scale Degree and Function"
	}
    },
    "Dominant Chords": {
	screen: reference_stack("    Dominant Chords", DominantChordsReferenceContainer),
	navigationOptions: {
	    title: "        Dominant Chords"
	}
    },
    "Secondary Dominants": {
	screen: reference_stack("    Secondary Dominants", SecondaryDominantsReferenceContainer),
	navigationOptions: {
	    title: "        Secondary Dominants"
	}
    },
    "Tritone Substitutes": {
	screen: reference_stack("    Tritone Substitutes", TritoneSubstitutesReferenceContainer),
	navigationOptions: {
	    title: "        Tritone Substitutes"
	}
    },
    "Diatonic Substitutes": {
	screen: reference_stack("    Diatonic Substitutes", DiatonicSubstitutesReferenceContainer),
	navigationOptions: {
	    title: "        Diatonic Substitutes"
	}
    },
});

export default RootDrawer;
