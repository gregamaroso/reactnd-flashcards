import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Navigator
} from 'react-native';
import { connect } from 'react-redux';

import { white, black, green } from '../utils/colors';
import { fetchDecks, clearLocalNotification, setLocalNotification } from '../utils/api';
import { lastQuized, resetQuiz } from '../store/actions';
import Card from './Card';

class Quiz extends Component {
  componentWillMount() {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  handleResetQuiz() {
    this.props.dispatch(resetQuiz());
  }

  handleGoBack() {
    this.props.navigation.goBack();
  }

  render() {
    const { navigate, state } = this.props.navigation;
    const { deck } = state.params;
    const { dispatch, currentQuestionIdx, decks } = this.props;
    const { questions, title } = decks[deck];

    if (questions.length > 0 && currentQuestionIdx == questions.length) {
      const { correct, incorrect } = this.props;
      const percentCorrect = Math.round((correct / (correct + incorrect)) * 100);
      const insult = percentCorrect < 50 ? 'Ouch' : 'Good job';

      return (
        <View style={[styles.container, styles.containerCenter]}>
          <Text style={styles.summary}>{insult}! You got {percentCorrect}%</Text>
          <Text style={styles.summary}>correct ({correct} out of {correct + incorrect})</Text>

          <TouchableHighlight style={styles.button} onPress={() => {
            this.handleResetQuiz()
          }}>
            <Text style={styles.buttonTxt}>Restart Quiz</Text>
          </TouchableHighlight>

          <TouchableHighlight style={styles.button} onPress={() => {
            this.handleGoBack()
          }}>
            <Text style={styles.buttonTxt}>Back to Deck</Text>
          </TouchableHighlight>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.count}>{currentQuestionIdx + 1} / {questions.length}</Text>
        <Card question={questions[currentQuestionIdx]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingLeft: 10,
   paddingRight: 10,
  },
  containerCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingTop: 10,
    textAlign: 'left',
  },
  summary: {
    fontSize: 20,
    color: green,
    textAlign: 'center',
    justifyContent: 'center'
  },
  button: {
    width: 250,
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: black,
    backgroundColor: black,
  },
  buttonTxt: {
    width: 240,
    color: white,
    fontSize: 32,
    textAlign: 'center'
  },
});

function mapStateToProps (state, ownProps) {
  return {
    correct: state.answers.correct,
    incorrect: state.answers.incorrect,
    currentQuestionIdx: state.answers.currentQuestionIdx,
    decks: state.decks
  }
}

export default connect(mapStateToProps)(Quiz);
