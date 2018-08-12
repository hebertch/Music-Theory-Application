import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Menu from './src/components/Menu';
import AppReducer from './src/reducers';

const store = createStore(AppReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Menu />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('fifths', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
