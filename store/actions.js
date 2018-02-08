import {
  RECEIVE_DECKS,
  ADD_QUESTION,
  ADD_DECK,
  ANSWER_QUESTION,
  QUIZ_START,
  RESET_QUIZ,
  RESET_DECKS,
} from './constants';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addQuestion(key, question) {
  return {
    type: ADD_QUESTION,
    question,
    key
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function answerQuestion(correct) {
  return {
    type: ANSWER_QUESTION,
    correct: correct,
  };
}

export function quizStart() {
  return {
    type: QUIZ_START
  };
}


export function resetDecks() {
  return {
    type: RESET_DECKS,
  };
}

export function resetQuiz() {
  return {
    type: RESET_QUIZ
  };
}
