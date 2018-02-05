import { default as React, Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, } from 'react-native';
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

const chord_quality_options = ['Maj', 'Min', 'Dim', 'Aug'];
const seventh_quality_options = ['None', 'Maj', 'Min', 'Dim'];
const root_tone_options = ['A', 'A#/Bb', 'B', 'Bb', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G']

const cCompositionEditView = component({
    getInitialState: function() {
	return {composition: [], analysisResults: [],
		selected_chord_quality: 'Maj',
	        selected_seventh_quality: 'None',
		selected_root_tone: 'C'};
    },

    newCompositionPressed: function() {
	this.setState({composition: []});
    },

    addChordPressed: function() {
	this.setState(function (state) {
	    return {composition: state.composition.concat([this.chordText()])};
	});
    },

    analyzePressed: function() {
	this.setState({analysisResults: ['G -> G breaks rule 1', 'G -> C breaks rule 2']});
    },

    chordQualitySelected: function(option) {
	this.setState({selected_chord_quality: option});
    },

    seventhQualitySelected: function(option) {
	this.setState({selected_seventh_quality: option});
    },

    rootToneSelected: function(option) {
	this.setState({selected_root_tone: option});
    },

    chordText: function() {
	return this.state.selected_root_tone + this.state.selected_chord_quality +
	    this.state.selected_seventh_quality;
    },

    render: function() {
	return e(View, {style: styles.container}, [
            eText(this.state.composition.join(', ')),
            e(Button, {title: 'New Composition', onPress: this.newCompositionPressed}),
	    e(SegmentedControls,
	      {options: root_tone_options,
	       onSelection: this.rootToneSelected,
	       selectedOption: this.state.selected_root_tone}),
	    e(SegmentedControls,
	      {options: chord_quality_options,
	       onSelection: this.chordQualitySelected,
	       selectedOption: this.state.selected_chord_quality}),
	    e(SegmentedControls,
	      {options: seventh_quality_options,
	       onSelection: this.seventhQualitySelected,
	       selectedOption: this.state.selected_seventh_quality}),
	    e(Text, {}, ['Chord: ' + this.chordText()]),
            e(Button, {title: 'Add Chord', onPress: this.addChordPressed}),
            e(Button, {title: 'Analyze', onPress: this.analyzePressed}),
            eText('Analysis Results:'),
            eText(this.state.analysisResults)
        ]);
    }
});

// Choose Chord Component
// Buttons: 12 Notes
// Text: display chord

// component
// accessed by the Main Menu sidebar
export const CompositionContainer = function () { 
    return e(cCompositionEditView);
}
