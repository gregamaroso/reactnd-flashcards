import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Navigator } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading} from 'expo';
import isEmpty from 'lodash/isEmpty';

import { fetchDecks } from '../utils/api';
import { black, white, lightGrey } from '../utils/colors';
import { receiveDecks, addDeck, quizStart, resetQuiz } from '../store/actions';
import Card from './Card';

class Deck extends Component {
  render() {
    const { navigate, state } = this.props.navigation;
    const { deckKey } = state.params;
    const { dispatch, decks } = this.props;

    if (isEmpty(decks)) {
      return <View style={styles.container} />;
    }

    const { questions, title } = decks[deckKey];

    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.subHead}>{questions.length} Cards</Text>
        </View>

        <TouchableOpacity style={[styles.button, styles.whiteBtn]} onPress={() => this.props.navigation.navigate('AddCard', {deck: deckKey}) }>
          <Text style={[styles.buttonTxt, styles.whiteBtnTxt]}>Add Card</Text>
        </TouchableOpacity>

        {questions.length > 0 && (
          <TouchableOpacity style={styles.button} onPress={() => {
            this.props.dispatch(resetQuiz())
            this.props.navigation.navigate('Quiz', {deck: deckKey})
          }}>
            <Text style={styles.buttonTxt}>Start Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   justifyContent: 'center',
   alignItems: 'center',
   paddingLeft: 10,
   paddingRight: 10
  },
  titleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    textAlign: 'center'
  },
  subHead: {
    fontSize: 22,
    color: lightGrey,
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
  whiteBtn: {
    backgroundColor: white
  },
  whiteBtnTxt: {
    color: black
  }
});

function mapStateToProps({ decks }) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Deck);
