import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { answerQuestion } from '../store/actions';
import { red, green, white } from '../utils/colors';

class AnswerButtons extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <View>
        <TouchableHighlight style={styles.button} onPress={() => dispatch(answerQuestion(true))}>
          <Text style={styles.buttonTxt}>Correct</Text>
        </TouchableHighlight>

        <TouchableHighlight style={[styles.button, styles.redBtn]} onPress={() => dispatch(answerQuestion(false))}>
          <Text style={styles.buttonTxt}>Incorrect</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export default connect()(AnswerButtons);
