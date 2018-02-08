import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

import AnswerButtons from './AnswerButtons';
import { red } from '../utils/colors';

export default class Card extends Component {
  state = {
    showAnswer: false
  }

  handleShowAnswer() {
    this.setState({showAnswer: true});
  }

  handleShowQuestion() {
    this.setState({showAnswer: false});
  }

  render() {
    const { question, answer } = this.props.question;
    const { showAnswer } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          { showAnswer
            ? <Answer handleShowQuestion={this.handleShowQuestion.bind(this)} answer={answer} />
            : <Question handleShowAnswer={this.handleShowAnswer.bind(this)} question={question} />
          }
        </View>
        <View style={styles.buttons}>
          <AnswerButtons />
        </View>
      </View>
    )
  }
}


export function Question({ question, handleShowAnswer }) {
  return (
    <View>
      <Text style={styles.content}>{ question }</Text>

      <TouchableHighlight onPress={handleShowAnswer}>
        <Text style={styles.flipper}>Answer</Text>
      </TouchableHighlight>
    </View>
  );
}

export function Answer({ answer, handleShowQuestion }) {
  return (
    <View>
      <Text style={styles.content}>{ answer }</Text>

      <TouchableHighlight onPress={handleShowQuestion}>
        <Text style={styles.flipper}>Question</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  card: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    fontSize: 32,
    textAlign: 'center',
  },
  flipper: {
    fontSize: 18,
    color: red,
    textAlign: 'center',
  },
});
