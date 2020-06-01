import * as React from 'react';
import { Platform } from 'react-native';
import Decklist from './components/DeckList';
import AddDeck from './components/AddDeck';
import DeckView from './components/DeckView';
import { Ionicons } from '@expo/vector-icons';
import { blue, white } from './utils/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import AddNewCard from './components/AddNewCard';
import Quiz from './components/Quiz';

const Tabs = createBottomTabNavigator();

function Tab() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? blue : white,
        style: {
          height: 90,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Decklist"
        component={Decklist}
        options={{
          tabBarLabel: 'My Decks',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-albums" size={20} color={tintColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddDeck"
        component={AddDeck}
        options={{
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-add-circle" size={20} color={tintColor} />
          ),
        }}
      />
    </Tabs.Navigator>
  )
}
const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Tab} />
            <Stack.Screen name="DeckView" component={DeckView} />
            <Stack.Screen name="AddNewCard" component={AddNewCard} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
