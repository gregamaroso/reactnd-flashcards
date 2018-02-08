import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';

import rootReducer from './store/reducers';
import ClearAll from './components/ClearAll';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import AddCard from './components/AddCard';
import { black, white } from './utils/colors';
import { setLocalNotification } from './utils/api';

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Entypo name='list' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <MaterialIcons name='add-circle-outline' size={30} color={tintColor} />
    }
  },
  ClearDecks: {
    screen: ClearAll,
    navigationOptions: {
      tabBarLabel: 'Clear Data',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-nuclear' size={30} color={tintColor} />
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? black : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const Stack = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title}`,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount () {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <View style={{flex: 1}}>
          <Stack />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
