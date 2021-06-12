import React from 'react';
import { LogBox } from 'react-native';
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

import RoomsHeader from './src/components/RoomsHeader';
import ChatHeader from './src/components/ChatHeader';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const httpLink = createHttpLink({
  uri: 'https://chat.thewidlarzgroup.com/api/graphiql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjQ1Mzg5NDIsImlhdCI6MTYyMjExOTc0MiwiaXNzIjoiY2hhdGx5IiwianRpIjoiYTQ0OGNiYzQtNWU5MS00ZTcxLWI5NDAtZGNkZDgyMjhiY2IxIiwibmJmIjoxNjIyMTE5NzQxLCJzdWIiOiI4YjE5YzI1YS00M2M0LTQ3OTMtOWIyYi04ZjhlOTcxN2Y2ZDkiLCJ0eXAiOiJhY2Nlc3MifQ.SPNRePK08Ol9c070KEcFHOI2cyfZM5FV22T9RTX1TthfjLWd4yYJiSTd-6LbtqlT2LI1q4s3pL-q_z870D3u1g',
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
          token:
            'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjaGF0bHkiLCJleHAiOjE2MjQ1Mzg5NDIsImlhdCI6MTYyMjExOTc0MiwiaXNzIjoiY2hhdGx5IiwianRpIjoiYTQ0OGNiYzQtNWU5MS00ZTcxLWI5NDAtZGNkZDgyMjhiY2IxIiwibmJmIjoxNjIyMTE5NzQxLCJzdWIiOiI4YjE5YzI1YS00M2M0LTQ3OTMtOWIyYi04ZjhlOTcxN2Y2ZDkiLCJ0eXAiOiJhY2Nlc3MifQ.SPNRePK08Ol9c070KEcFHOI2cyfZM5FV22T9RTX1TthfjLWd4yYJiSTd-6LbtqlT2LI1q4s3pL-q_z870D3u1g',
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
            options={{ headerTitle: () => <RoomsHeader /> }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerBackTitleVisible: false,
              headerTitle: () => <ChatHeader />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
