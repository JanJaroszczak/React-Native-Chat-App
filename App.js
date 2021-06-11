import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MessagesScreen from './src/screens/MessagesScreen';
import ChatScreen from './src/screens/ChatScreen';

import {
  NavigationContainer,
  // DarkTheme,
  // DrawerActions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  // createHomeStack = () => (
  //   <Stack.Navigator>
  //     <Stack.Screen name="Feed" component={Feed} />
  //     <Stack.Screen name="Detail" component={Detail } />
  //   </Stack.Navigator>
  // );

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    // <Feed />

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MessagesScreen"
          component={MessagesScreen}
          options={{
            title: 'My MessagesScreen',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title: 'Chat Screen',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;
