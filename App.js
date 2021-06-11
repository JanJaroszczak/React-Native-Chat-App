import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MessagesScreen from './src/screens/MessagesScreen';
import ChatScreen from './src/screens/ChatScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Messages"
          component={MessagesScreen}
          options={
            {
              // title: 'Messages',
              // headerStyle: { backgroundColor: 'black' },
              // headerTintColor: 'white',
            }
          }
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          // options={
          //   {
          //     title: 'Chat',
          //     headerStyle: { backgroundColor: 'black' },
          //     headerTintColor: 'white',
          //   }
          // }
          options={({ route }) => ({
            title: route.params.userName,
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
