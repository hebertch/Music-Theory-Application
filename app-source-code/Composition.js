import { default as React, Component } from 'react';
import { Platform, StyleSheet, Text, View, } from 'react-native';

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

// component
// accessed by the Main Menu sidebar
export const CompositionContainer = function () { 
  return e(View);
}
