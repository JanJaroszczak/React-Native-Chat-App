import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feed from './src/Feed';
import Detail from './src/Detail';

import {
  NavigationContainer,
  // DarkTheme,
  // DrawerActions,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
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
          name="Feed"
          component={Feed}
          options={{
            title: 'My Feed',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: 'Details Screen',
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
