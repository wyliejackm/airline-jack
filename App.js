import React from 'react'

import BookFlightScreen from './src/screens/BookFlightScreen';
import EditFlightScreen from './src/screens/EditFlightScreen';
import SigninScreen from './src/screens/SigninScreen';
import FlightListScreen from './src/screens/FlightListScreen';
import ViewFlightScreen from './src/screens/ViewFlightScreen';
import AccountScreen from './src/screens/AccountScreen';

import { Provider as AuthProvider } from './src/contexts/AuthContext'
import { Provider as FlightProvider } from './src/contexts/FlightContext'

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { setNavgiator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  Signin: SigninScreen,
  mainFlow: createMaterialBottomTabNavigator({
    flightsFlow: createStackNavigator({
      FlightList: FlightListScreen,
      ViewFlight: ViewFlightScreen,
      EditFlight: EditFlightScreen,
    }),
    BookFlight: BookFlightScreen,
    Account: AccountScreen,
  })
})

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <FlightProvider>
      <AuthProvider>
        <App ref={(navigator) => { setNavgiator(navigator) }} />
      </AuthProvider>
    </FlightProvider>
  )
}
