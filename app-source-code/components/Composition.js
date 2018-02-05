import { default as React, Component } from 'react';
import { Button, Platform, StyleSheet, Text, View, } from 'react-native';

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

const cCompositionEditView = component({
    getInitialState: function() {
	return {composition: ['C', 'Am', 'Bdim', 'C'], analysisResults: []};
    },

    newCompositionPressed: function() {
	this.setState({composition: []});
    },

    addChordPressed: function() {
	this.setState({composition: this.state.composition.concat(['G'])});
    },

    analyzePressed: function() {
	this.setState({analysisResults: ['G -> G breaks rule 1', 'G -> C breaks rule 2']});
    },

    render: function() {
	return e(View, {style: styles.container}, [
            eText(this.state.composition),
            e(Button, {title: 'New Composition', onPress: this.newCompositionPressed}),
            e(Button, {title: 'Add Chord', onPress: this.addChordPressed}),
            e(Button, {title: 'Analyze', onPress: this.analyzePressed}),
            eText('Analysis Results:'),
            eText(this.state.analysisResults)
        ]);
    }
});

// Choose Chord Component
// Buttons: 12 Notes
// Radio: Minor/Major/Diminished/Augmented radio
// Radio: no/Major/Minor/Diminished 7th radio
// Text: display chord

// component
// accessed by the Main Menu sidebar
export const CompositionContainer = function () { 
    return e(cCompositionEditView);
}
