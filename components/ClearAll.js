import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { clearAsyncData } from '../utils/api';
import { red, green, white } from '../utils/colors';
import { resetDecks, resetQuiz } from '../store/actions';

class ClearAll extends Component {
  _clearAllData() {
    const { navigation, clearStateData } = this.props;

    // clear data from asyncstorage
    clearAsyncData();

    // clear state
    clearStateData();

    // go back to the home screen
    navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={[styles.button, styles.redBtn]} onPress={() => this._clearAllData()}>
          <Text style={styles.buttonTxt}>Clear All Decks</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: green,
  },
  redBtn: {
    backgroundColor: red
  },
  buttonTxt: {
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    textAlign: 'center',
    color: white,
    fontSize: 32,
  },
});

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    clearStateData: () => {
      dispatch(resetDecks());
      dispatch(resetQuiz());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearAll);
