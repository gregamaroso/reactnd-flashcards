import { combineReducers } from 'redux';
import {
  RECEIVE_DECKS,
  ADD_QUESTION,
  ADD_DECK,
  ANSWER_QUESTION,
  QUIZ_START,
  RESET_QUIZ,
  RESET_DECKS,
} from './constants'

// currently not used
const initialDeckState = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

const initialAnswerState = {
  correct: 0,
  incorrect: 0,
  currentQuestionIdx: 0,
  quizStarted: false,
};

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_QUESTION:
      let newState = { ...state };
      newState[action.key].questions.push(action.question);
      return {
        ...newState
      };

    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };

    case RESET_DECKS:
      // return { ...initialDeckState };
      return {};

    default:
      return {
        ...state,
      };
  }
}

function answers(state = initialAnswerState, action) {
  switch (action.type) {
    case ANSWER_QUESTION:
      let newState = { ...state };
      if (action.correct) {
        newState.correct += 1;
      }
      else {
        newState.incorrect += 1;
      }
      newState.currentQuestionIdx += 1;

      return {
        ...newState
      };

    case QUIZ_START:
      return {
        ...state,
        quizStarted: true
      };

    case RESET_QUIZ:
      return {
        ...initialAnswerState
      };

    default:
      return {
        ...state
      };
  }
}

const rootReducer = combineReducers({ decks, answers });
export default rootReducer;
