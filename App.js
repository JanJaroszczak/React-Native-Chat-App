import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RoomsScreen from './src/screens/RoomsScreen';
import ChatScreen from './src/screens/ChatScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  split,
} from '@apollo/client';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';
import { hasSubscription } from '@jumpn/utils-graphql';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://chat.thewidlarzgroup.com/api/graphiql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'Bearer ',
    },
  };
});

const authedHttpLink = authLink.concat(httpLink);

const phoenixSocket = new PhoenixSocket(
  'wss://chat.thewidlarzgroup.com/socket',
  {
    params: () => {
      if (1) {
        return {
          token: '',
        };
      } else {
        return {};
      }
    },
  }
);

const absintheSocket = AbsintheSocket.create(phoenixSocket);

const websocketLink = createAbsintheSocketLink(absintheSocket);

const link = split(
  (operation) => hasSubscription(operation.query),
  websocketLink,
  authedHttpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Rooms"
            component={RoomsScreen}
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
              // title: route.params.userName,
              headerBackTitleVisible: false,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
