import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Web3Provider } from './contexts/web3Context';

const AppStack = createStackNavigator();

import Main from './pages/Main';
import Transfer from './pages/Transfer';
import History from './pages/History';

export default function Routes() {
  return (
    <NavigationContainer>
      <Web3Provider>
        <AppStack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
            <AppStack.Screen name="Carteira" component={Main} />
            <AppStack.Screen name="Histórico" component={History} />
            <AppStack.Screen name="Transferir" component={Transfer} />
        </AppStack.Navigator>
      </Web3Provider>
    </NavigationContainer>
  )
}