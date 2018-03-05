import { default as React, Component } from 'react';
import { Button, Platform, StyleSheet, Switch, Text, View, } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons'

// f(component, props, childElements) => element
const e = function(component, props, children) {
    props = props || {};
    children = children || [];
    return React.createElement(component, props, ...children);
};
// f(methods) => component
const component = React.createClass;

// f(text, props) => element
const eText = function(text, props) {
    props = props || {};
    return e(Text, props, text);
};

const styles = StyleSheet.create({
    container: {
	marginTop: 21
    }
});

const chord_quality_options = ['Maj', 'Min', 'Dom', 'Dim'];
const key_quality_options = ['Maj', 'Min'];
const root_tone_options = ['A', 'A#/Bb', 'B', 'Bb', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G'];

const step_up = "↑";
const step_down = "↓";
const leap_up = "↟";
const leap_down = "↡";
const parallel_motion = "≈";

const make_chord = function(root, quality) {
    return { root: root, quality: quality };
}

const chordText = function(chord) {
    return chord.root + chord.quality;
}
const compositionText = function(composition_chords, analyze_p, key) {
    return '';
}

const cCompositionEditView = component({
    getInitialState: function() {
	return {composition: [], analysisResults: [],
		selected_chord: make_chord('C', 'Maj'),
		selected_key: make_chord('C', 'Maj')};
    },

    newCompositionPressed: function() {
	this.setState({composition: []});
    },

    addChordPressed: function() {
	this.setState(function (state) {
	    return {composition: state.composition.concat([this.selected_chord])};
	});
    },

    rootToneSelected: function(option) {
	this.setState(function (state) {
	    return {selected_chord: make_chord(option, state.selected_chord.quality)};
	});
    },
    
    chordQualitySelected: function(option) {
	this.setState(function (state) {
	    return {selected_chord: make_chord(state.selected_chord.root, option)};
	});
    },

    keyRootToneSelected: function(option) {
	this.setState(function (state) {
	    return {selected_key: make_chord(option, state.selected_key.quality)};
	});
    },
    
    keyQualitySelected: function(option) {
	this.setState(function (state) {
	    return {selected_key: make_chord(state.selected_key.root, option)};
	});
    },

    render: function() {
	return e(View, {style: styles.container}, [
	    eText("Key"),
	    e(SegmentedControls,
	      {options: root_tone_options,
	       onSelection: this.keyRootToneSelected,
	       selectedOption: this.state.selected_key.root}),
	    e(SegmentedControls,
	      {options: key_quality_options,
	       onSelection: this.keyQualitySelected,
	       selectedOption: this.state.selected_key.quality}),

	    eText("Chord"),
	    e(SegmentedControls,
	      {options: root_tone_options,
	       onSelection: this.rootToneSelected,
	       selectedOption: this.state.selected_chord.root}),
	    e(SegmentedControls,
	      {options: chord_quality_options,
	       onSelection: this.chordQualitySelected,
	       selectedOption: this.state.selected_chord.quality}),
	    
            e(Button, {title: 'Add Chord', onPress: this.addChordPressed}),
            eText(compositionText(this.state.composition, true)),
	    e(Button, {title: 'New Composition', onPress: this.newCompositionPressed})
        ]);
    }
});

// component
// accessed by the Main Menu sidebar
export const CompositionContainer = function () { 
    return e(cCompositionEditView);
}
