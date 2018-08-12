import { default as React, Component } from 'react';
import { Button, Platform, ScrollView, StyleSheet, Switch, Text, View, } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'
import component from 'create-react-class';

import { colorArraySelect } from '../static/colors';

/// Analysis Algorithm
// The 7 letters in circle of fifths order.
const root_letters = ['f', 'c', 'g', 'd', 'a', 'e', 'b'];

const roman_numeral_dominant_text = '⁷';
const roman_numeral_diminished_text = '°';

// Enum: Qualities
export const major = 0;
export const minor = 1;
export const diminished = 2;
export const dominant = 3;
const quality_texts = ["", "m", roman_numeral_diminished_text, roman_numeral_dominant_text];

// Qualities of chords ordered by scale steps
const major_qualities = [major, minor, minor, major, dominant, minor, diminished];
const minor_qualities = [minor, diminished, major, minor, minor, major, dominant];

// Circle of Fifth's Offsets of scale tones
const major_scale_offsets = [0, 2, 4, -1, 1, 3, 5];
const minor_scale_offsets = [0, 2, -3, -1, 1, -4, -2];

// Enum: Tonal Gravity Transitions
export const step_up = 0;
export const step_down = 1;
export const leap_up = 2;
export const leap_down = 3;
export const parallel_motion = 4;
const tonal_gravity_transition_texts = ["↑", "↓", "↟", "↡", "≈"];


// Enum: Substitution types
export const diatonic = 0;
export const borrowed = 1;
export const secondary_dominant = 2;
export const tritone = 3;
export const unknown = 4;
const substitution_texts = ['Diatonic', 'Borrowed', 'Secondary Dominant', 'Tritone', 'Unknown'];

export const make_analysis = function(chord, fifth_position, type, next_chord) {
    return { chord: chord, fifth_position: fifth_position, type: type, next_chord: next_chord };
}

// Accidentals
// Natural is 0
// -1 for each flat
// +1 for each sharp
export const double_flat = -2;
export const flat = -1;
export const natural = 0;
export const sharp = 1;
export const double_sharp = 2;

// Accidental Texts
const natural_text = '♮';
const flat_text = '♭';
const double_flat_text = '♭♭';
//const double_flat_text = '𝄫';
const triple_flat_text = '♭♭♭';
const sharp_text = '♯';
//const double_sharp_text = '𝄪';
const double_sharp_text = '♯♯';
const triple_sharp_text = '♯♯♯';

const roman_numeral_texts = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

const scale_length = 7;

// E.g.: C#, Ab, D, F##
export const make_tone = function(letter, num_accidentals) {
    return { letter: letter,
	     num_accidentals: num_accidentals,
	   };
}

// List of common tones
export const f_flat = make_tone('f', -1);
export const c_flat = make_tone('c', -1);
export const g_flat = make_tone('g', -1);
export const d_flat = make_tone('d', -1);
export const a_flat = make_tone('a', -1);
export const e_flat = make_tone('e', -1);
export const b_flat = make_tone('b', -1);
export const f_natural = make_tone('f', 0);
export const c_natural = make_tone('c', 0);
export const g_natural = make_tone('g', 0);
export const d_natural = make_tone('d', 0);
export const a_natural = make_tone('a', 0);
export const e_natural = make_tone('e', 0);
export const b_natural = make_tone('b', 0);
export const f_sharp = make_tone('f', 1);
export const c_sharp = make_tone('c', 1);
export const g_sharp = make_tone('g', 1);
export const d_sharp = make_tone('d', 1);
export const a_sharp = make_tone('a', 1);
export const e_sharp = make_tone('e', 1);
export const b_sharp = make_tone('b', 1);

// E.g.: C# Major, Ab Minor, D Dominant
export const make_chord = function(root, quality) {
    return { root: root, quality: quality };
};

// E.g.: major, minor
const quality_text = function (quality) {
    return quality_texts[quality];
};

// Convert number of accidentals to text: e.g. -1 is b (flat), +2 is ## (double sharp).
const accidental_text = function(num_accidentals) {
    // Convert number of accidentals to the appropriate text.
    switch (num_accidentals) {
    case -3: return triple_flat_text;
    case -2: return double_flat_text;
    case -1: return flat_text;
    case 1: return sharp_text;
    case 2: return double_sharp_text;
    case 3: return triple_sharp_text;
    }
    // console.assert(num_accidentals >= -3 && num_accidentals <= 3, "Too many sharps or flats.")
    return '';
}
// Convert back from text to number of accidentals
const accidental_text_to_num_accidentals = function(text) {
    // Assume that triple_flat_text/triple_sharp_text will not be converted from text,
    // since they are not options for accidentals.
    switch (text) {
    case double_flat_text: return -2;
    case flat_text: return -1;
    case natural_text: return 0;
    case sharp_text: return 1;
    case double_sharp_text: return 2;
    }
    return 0;
}

// Convert a root tone to text
const root_text = function (root) {
    return root.letter.toUpperCase() + accidental_text(root.num_accidentals);
};

export const root_tone_from_fifth_position = function(idx) {
    // Convert an index into the circle of fifths into a tone
    if (idx < 0) { // negative number indicates flat
	var num_flats = Math.trunc(-idx / (scale_length + 1)) + 1;
	idx += num_flats * scale_length;
	return make_tone(root_letters[idx % scale_length], -num_flats);
    }
    return make_tone(root_letters[idx % 7], Math.trunc(idx / scale_length));
};

export const fifth_position = function (r) {
    // Convert a tone into an index into the circle of fifths.
    // ..., eb=-2, bb = -1, f = 0, c = 1, g = 2, ...
    return root_letters.indexOf(r.letter) + r.num_accidentals * scale_length;
};

export const tonal_gravity_transition = function(fifth_pos1, fifth_pos2) {
    // one of [lu, ld, su, sd, pm]
    // Calculate the transition from r1 to r2
    var f1 = fifth_pos1, f2 = fifth_pos2;
    if (f1 === f2) {
	return parallel_motion;
    }
    if (f2 === f1 - 1) {
	return step_down;
    }
    if (f2 === f1 + 1) {
	return step_up;
    }
    if (f2 < f1) {
	return leap_down;
    }
    return leap_up;
};

// Convert a chord to its textual name.
const chord_text = function(chord) {
    return root_text(chord.root) + quality_text(chord.quality);
};

const chords_eql = function(c1, c2) {
    // True if two chords are the exact same.
    return c1.root.letter == c2.root.letter && 
	c1.root.num_accidentals == c2.root.num_accidentals && 
	c1.quality == c2.quality;
}

// Find position of element in list using ===
const position = function(element, list) {
    for (var i = 0; i < list.length; ++i) {
	if (element === list[i])
	    return i;
    }
    return null;
};

// Find index of chord in chords
const position_chord = function(chord, chords) {
    for (var j = 0; j < chords.length; j++) {
	if (chords_eql(chord, chords[j])) {
	    return j;
	}
    }
    return null;
};

// Return the relative major/minor key of key
// E.g. C <-> Am
export const relative_key = function(key) {
    var key_pos = fifth_position(key.root),
	offset = key.quality === major ? 3 : -3,
	
	relative_key_quality = key.quality === major ? minor : major,
	relative_key_pos = key_pos + offset,
	relative_key_root_tone = root_tone_from_fifth_position(relative_key_pos);
    return make_chord(relative_key_root_tone, relative_key_quality);
};

// Return the parallel major/minor key of key
// E.g. C <-> Cm
export const parallel_key = function(key) {
    var parallel_key_quality = key.quality === major ? minor : major;
    return make_chord(key.root, parallel_key_quality);
};

const composition_chord_analysis = function(chord, next_chord, key_chords, parallel_key_chords) {
    // Analyze a chord as part of a composition_analysis

    // Analyze diatonic chords
    if (position_chord(chord, key_chords) !== null)
	return make_analysis(chord, fifth_position(chord.root), diatonic, next_chord);

    // Analyze borrowed chords
    if (position_chord(chord, parallel_key_chords) !== null)
	return make_analysis(chord, fifth_position(chord.root), borrowed, next_chord);

    // Analyze secondary dominants
    if (chord.quality === dominant && 
	next_chord &&
	position_chord(next_chord, key_chords) &&
	fifth_position(chord.root) - 1 === fifth_position(next_chord.root)) {

	return make_analysis(chord, fifth_position(chord.root), secondary_dominant, next_chord);
    }

    // Analyze tritone substitutes
    if (chord.quality === dominant && 
	next_chord &&
	(fifth_position(chord.root) + 5 === fifth_position(next_chord.root) ||
	 fifth_position(chord.root) - 7 === fifth_position(next_chord.root))) {

	return make_analysis(chord, fifth_position(next_chord.root) + 1, tritone, next_chord);
    }

    // NOTE: Do not try to analyze diatonic substitutes

    // Unknown substitution
    return make_analysis(chord, fifth_position(chord.root), unknown, next_chord);
};

// Perform a full analysis of chords in a composition, in the given key.
export const composition_analysis = function(composition_chords, key) {
    // Analyse the composition_chords
    var key_chords = key_diatonic_chords(key), parallel_key_chords = key_diatonic_chords(parallel_key(key));
    var analysis = [];
    
    for (var i = 0; i < composition_chords.length; ++i) {
	var chord = composition_chords[i];
	var next_chord = i !== composition_chords.length-1 ? composition_chords[i + 1] : null;
	var tmp = composition_chord_analysis(chord, next_chord, key_chords, parallel_key_chords);
	analysis.push(tmp);
    }
    return analysis;
};

// Return the diatonic chord in key given the scale degree scale_step.
// e.g.
//   key_diatonic_chord(C Major, 1) => C Major
//   key_diatonic_chord(C Major, 2) => D Minor
export const key_diatonic_chord = function(key, scale_step) {
    // scale_step: 1-7
    var p = fifth_position(key.root);
    scale_step = (scale_step - 1) % 7;
    var is_major = key.quality == major;
    var offset = is_major ? major_scale_offsets[scale_step] : minor_scale_offsets[scale_step];
    var quality = is_major ? major_qualities[scale_step] : minor_qualities[scale_step];
    var p2 = p + offset;
    var tone = root_tone_from_fifth_position(p2);
    return make_chord(tone, quality);
};

export const key_diatonic_chord_progression = function(key) {
    // all of the diatonic chords in key
    // I ii iii IV V7 vi viio (major)
    // i iio III iv v VI VII (minor)
    var chords = [];
    for (var i = 1; i < 8; i++) {
	chords.push(key_diatonic_chord(key, i));
    }
    // Also Add the non-dominant V
    key_diatonic_chord(key, );
    return chords;
};

export const key_diatonic_chords = function(key) {
    // all of the diatonic chords in key + V in the major key
    // I ii iii IV V7 vi viio V (major)
    // i iio III iv v VI VII (minor)
    var chords = key_diatonic_chord_progression(key);
    // Also Add the non-dominant V for the major key.
    if (key.quality === major) {
	var chord = key_diatonic_chord(key, 5);
	chords.push(make_chord(chord.root, major));
    }
    return chords;
};

// If the chord is a diatonic chord in the given key, return its scale_idx [0-7].
export const key_diatonic_chord_scale_idx = function(key, chord) {
    var chords = key_diatonic_chords(key);
    var idx = position_chord(chord, chords);
    if (idx !== null) {
	if (idx === 8) return 4;
	return idx;
    }
    return null;
}

const major_scale_letters = function(root) {
    // all of the letters in the major scale for root
    var chords = key_diatonic_chords(make_chord(root, major));
    var letters = [];
    for (var i = 0; i < chords.length; ++i) {
	letters.push(chords[i].root.letter);
    }
    return letters;
}

export const major_relative_roman_numeral_text = function(key, chord) {
    // Return the roman numeral text for the chord relative to the major key
    // I ii iii ... (major)
    // i iio bIII ... (parallel minor)

    // Find the associated major chord and create text relative to that.
    // e.g. key=C major, chord=Eb Major
    //   major chord: iii or E minor
    //   chord = bIII, since we are flat relative to the iii chord.

    var scale_idx = position(chord.root.letter, major_scale_letters(key.root));
    var major_chords = key_diatonic_chords(make_chord(key.root, major));
    var major_chord_num_accidentals = major_chords[scale_idx].root.num_accidentals;
    var text = roman_numeral_texts[scale_idx];

    // Capitalize if Major or dominant, lowercase if minor or diminished.
    if (chord.quality === major ||
	chord.quality === dominant) {
	text = text.toUpperCase();
    }

    // Prepend accidental text.
    switch (major_chord_num_accidentals - chord.root.num_accidentals) {
    case 1: text = flat_text + text; break;
    case 2: text = double_flat_text + text; break;
    case 3: text = triple_flat_text + text; break;
    case -1: text = sharp_text + text; break;
    case -2: text = double_sharp_text + text; break;
    case -3: text = triple_sharp_text + text; break;
    }

    // add 7 if dominant, o if diminished
    if (chord.quality === dominant) {
	text = text + roman_numeral_dominant_text;
    } else if (chord.quality === diminished) {
	text = text + roman_numeral_diminished_text;
    }
    return text;
}

const c_major = make_chord(c_natural, major);
const a_flat_minor = make_chord(a_flat, minor);

const grand_cadence = function(key) {
    return [key_diatonic_chord(key, 1),
	    key_diatonic_chord(key, 4),
	    key_diatonic_chord(key, 1),
	    key_diatonic_chord(key, 5),
	    key_diatonic_chord(key, 1)
	   ];
}

// Return parenthetical text of a substitution for a given chord_analysis.
export const chord_analysis_substitution_text = function(key, chord_analysis) {
    var substitution_text = '';
    var type = chord_analysis.type;
    var chord = chord_analysis.chord;
    var next_chord = chord_analysis.next_chord;
    var fifth_pos = chord_analysis.fifth_position;
    
    switch (type) {
    case diatonic: break; // No substitution text for diatonic, borrowed, or unknown chords.
    case borrowed: break;
    case secondary_dominant:
	// E.g. V7/V7
	substitution_text =
	    'V' + roman_numeral_dominant_text + '/' +
	    major_relative_roman_numeral_text(key, next_chord);
	break;
    case tritone:
	// E.g. TtV7/V7
	var chord2 = make_chord(root_tone_from_fifth_position(fifth_pos), chord.quality);
	substitution_text =
	    'TtV' + roman_numeral_dominant_text + '/' +
	    major_relative_roman_numeral_text(key, next_chord);
	break;	
    }
    return substitution_text;
}

/// End Analysis Algorithm

// Match diatonic colors with the circle of fifths page.
const fifth_position_color = function(fifth_pos, key) {
    var key_fifth_pos = fifth_position(key.root);
    var color_idx = key_fifth_pos - fifth_pos + 6;
    color_idx = key.quality === major ? (144 - color_idx) % 12 : (144 + color_idx) % 12;
    return colorArraySelect(key.quality === major ? 'maj' : 'min')[color_idx];
}

// Requirement 02: Analyze tonal gravity
// Returns a React Native element containing the chord and its analyis.
const e_composition_chord = function(chord_analysis, previous_chord_analysis, key) {
    var next_chord = chord_analysis.next_chord;

    // Use the analyzed/functional fifth position
    var fifth_pos = chord_analysis.fifth_position;
    var chord = chord_analysis.chord;

    // Perform tonal gravity analysis between previous chord and current chord.
    var transition = 
	previous_chord_analysis ? 
	tonal_gravity_transition(previous_chord_analysis.fifth_position, fifth_pos) : 
	null;
    
    var transition_text =
	transition !== null ? 
	tonal_gravity_transition_texts[transition] :
	'';
    
    var substitution_text = chord_analysis_substitution_text(key, chord_analysis);
    var is_diatonic_or_substitute = chord_analysis.type !== unknown;

    // Use the rainbow colors from the CoF page if it has a diatonic function
    // Otherwise use white.
    var color = is_diatonic_or_substitute ?
	fifth_position_color(fifth_pos, key) :
	'white';

    // Add parentheses to the substitution text.
    if (substitution_text.length > 0) {
	substitution_text = '(' + substitution_text + ')';
    }

    // Display the chords
    return e(View, {style: {flexDirection: 'row'}}, [
	eText(transition_text + ' ',
	      {style: {color: (transition === leap_down ? 'red' : 'black')}}),
	eText(chord_text(chord_analysis.chord) + ' ' +
	      major_relative_roman_numeral_text(key, chord_analysis.chord) + ' ',
	      {style: {color: color,
		       backgroundColor: '#2a2a2a'}}),
	eText(substitution_text,
	      {style: {color: color,
		       backgroundColor: '#2a2a2a'}})
    ]);
}

// Requirement 01: "User can have the application analyze a composition and determine if it follows the rules of tonal gravity"
// Return a React Native element rendering the entire composition.
const e_composition = function(composition_chords, key) {
    var analysis = composition_analysis(composition_chords, key);
    var chord_es = [];

    for (var i = 0; i < analysis.length; ++i) {
	var chord_analysis = analysis[i];
	var previous_chord_analysis = i > 0 ? analysis[i - 1] : null;

	
	chord_es.push(e_composition_chord(chord_analysis, previous_chord_analysis, key));
    }
    return e(View, {style: {flexDirection: 'row', flexWrap: 'wrap'}}, chord_es);
}

// f(component, props, childElements) => element
// Create a React element.
const e = function(component, props, children) {
    props = props || {};
    children = children || [];
    return React.createElement(component, props, ...children);
};

// f(text, props) => element
// Create React Text Element.
const eText = function(text, props) {
    props = props || {};
    return e(Text, props, text);
};

// React Stylesheet.
const styles = StyleSheet.create({
    container: {
	    marginTop: 20,
    }
});

// Options for the Radio Buttons
const key_accidental_options = [flat_text, natural_text, sharp_text];
const accidental_options = [double_flat_text, flat_text, natural_text, sharp_text, double_sharp_text];
const chord_quality_options = ['Major', 'Minor', roman_numeral_diminished_text, roman_numeral_dominant_text];
const key_quality_options = ['Major', 'Minor'];
const letter_options = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];

// Convert from the chord quality text to the chord quality enum.
const chord_quality_text_to_chord_quality = function(text) {
    return chord_quality_options.indexOf(text);
}

// React Component that creates the Composition edit/display/analyze view.
const cCompositionEditView = component({
    // Sets the initial state of the radio buttons.
    getInitialState: function() {
	return {composition: [],

		selected_key_letter: 'C',
		selected_key_accidental: natural_text,
		selected_key_quality: 'Major',

		selected_chord_letter: 'C',
		selected_chord_accidental: natural_text,
		selected_chord_quality: 'Major'
	       };
    },

    // Delete the old composition
    new_composition_pressed: function() {
	this.setState({composition: []});
    },

    // Requirement 01: "User has the ability to create a few measures of a chord progression"
    add_chord_pressed: function() {
    const composition = this.state.composition;
    this.setState({composition: composition.concat([this.selected_chord()])});
    },

    // Update the state of the component when the user changes an option
    // Key option changed:
    selected_key_letter_changed: function(option) {
	this.setState(function (state) {
	    return {selected_key_letter: option};
	});
    },
    selected_key_accidental_changed: function(option) {
	this.setState(function (state) {
	    return {selected_key_accidental: option};
	});
    },  
    selected_key_quality_changed: function(option) {
	this.setState(function (state) {
	    return {selected_key_quality: option};
	});
    },

    // Chord option changed:
    selected_chord_letter_changed: function(option) {
	this.setState(function (state) {
	    return {selected_chord_letter: option};
	});
    },
    selected_chord_accidental_changed: function(option) {
	this.setState(function (state) {
	    return {selected_chord_accidental: option};
	});
    },  
    selected_chord_quality_changed: function(option) {
	this.setState(function (state) {
	    return {selected_chord_quality: option};
	});
    },

    // Converts the user-inputted key selection into a tone that can be used for analysis
    selected_key_tone: function() {
	var letter = this.state.selected_key_letter.toLowerCase();
	var num_accidentals = accidental_text_to_num_accidentals(this.state.selected_key_accidental);
	return make_tone(letter, num_accidentals);
    },
    // Converts the user-inputted key selection into a key that can be used for analysis
    selected_key: function() {
	return make_chord(this.selected_key_tone(),
			  chord_quality_text_to_chord_quality(this.state.selected_key_quality));
    },

    // Converts the user-inputted chord selection into a tone that can be used for analysis
    selected_chord_tone: function() {
	var letter = this.state.selected_chord_letter.toLowerCase();
	var num_accidentals = accidental_text_to_num_accidentals(this.state.selected_chord_accidental);
	return make_tone(letter, num_accidentals);
    },
    // Converts the user-inputted chord selection into a chord that can be used for analysis
    selected_chord: function() {
	return make_chord(this.selected_chord_tone(),
			  chord_quality_text_to_chord_quality(this.state.selected_chord_quality));
    },
    
    render: function() {
	// Place composition inside a scroll view
	return e(ScrollView, {contentContainerStyle: {flexGrow: 1}}, [
	    e(View, {style: styles.container}, [
		// React Elements for Key Radio buttons
		eText("Key", {style: {alignSelf: 'center'}}),

		e(SegmentedControls,
		  {options: letter_options,
		   onSelection: this.selected_key_letter_changed,
		   selectedOption: this.state.selected_key_letter}),
		e(SegmentedControls,
		  {options: key_accidental_options,
		   onSelection: this.selected_key_accidental_changed,
		   selectedOption: this.state.selected_key_accidental}),
		e(SegmentedControls,
		  {options: key_quality_options,
		   onSelection: this.selected_key_quality_changed,
		   selectedOption: this.state.selected_key_quality}),

		// Requirement 01: "User has an easy way of inputting chords..."
		// React Elements for chord Radio buttons
		eText("Chord", {style: {alignSelf: 'center', paddingTop: 20}}),

		e(SegmentedControls,
		  {options: letter_options,
		   onSelection: this.selected_chord_letter_changed,
		   selectedOption: this.state.selected_chord_letter}),
		e(SegmentedControls,
		  {options: accidental_options,
		   onSelection: this.selected_chord_accidental_changed,
		   selectedOption: this.state.selected_chord_accidental}),
		e(SegmentedControls,
		  {options: chord_quality_options,
		   onSelection: this.selected_chord_quality_changed,
		   selectedOption: this.state.selected_chord_quality}),

		// React Element button for Clearing the existing composition
		e(Button, {title: 'New Composition', onPress: this.new_composition_pressed}),
		// React Element button for adding the existing chord
		e(Button, {title: 'Add Chord', onPress: this.add_chord_pressed}),
		// React Elements for displaying the composition and its analysis
		eText('Composition', {style: {alignSelf: 'center'}}),
		e_composition(this.state.composition, this.selected_key())
	    ])]);
    }
});

// component
// accessed by the Main Menu sidebar
export default cCompositionEditView;
