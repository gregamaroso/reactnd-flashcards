import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { AppLoading} from 'expo';
import isEmpty from 'lodash/isEmpty';

import { getDecks } from '../utils/api';
import { receiveDecks, resetQuiz } from '../store/actions';
import { black, white, red, lightGrey } from '../utils/colors';

class DeckList extends Component {
  _keyExtractor = (item, index) => item;

  state = {
    showInput: false
  }

  componentWillMount () {
    const { dispatch } = this.props;

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)));
  }

  render() {
    const { decks } = this.props;
    const { showInput, input } = this.state;

    // TODO: needs a better solution for loading
    if (decks === null) {
      return <AppLoading />
    }

    if (isEmpty(decks)) {
      return (
        <View style={[styles.container, styles.centered]}>
          <Text style={styles.normal}>Add a deck to</Text>
          <Text style={styles.normal}>get started!</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(decks)}
          keyExtractor={this._keyExtractor}
          extraData={this.state}
          renderItem={this._renderItem}
          containerStyle={{borderBottomWidth: 2}}
          contentContainerStyle={styles.centeredCell} />
      </View>
    );
  }

  _renderItem = ({item}) => {
    const { title, questions } = this.props.decks[item];
    const { navigate } = this.props.navigation;

    return (
      <TouchableHighlight style={styles.item} onPress={() => {
        navigate('Deck', {
          deckKey: item,
          title,
          questions,
        })
      }}>
        <View>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.cardCount}>{questions.length} cards</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   backgroundColor: white
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    color: 'red',
    backgroundColor: '#efefef'
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: 140,
    borderRadius: 5,
    height: 30,
    backgroundColor: 'red'
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    padding: 20,
    margin: 20,
    borderBottomWidth: 1
  },
  centeredCell: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  deckTitle: {
    textAlign: 'center',
    color: black,
    fontWeight: 'bold',
    fontSize: 32
  },
  cardCount: {
    textAlign: 'center',
    fontSize: 24,
    color: lightGrey
  },
  normal: {
    fontSize: 28,
    textAlign: 'center',
  }
});

function mapStateToProps({ decks }) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
