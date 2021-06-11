import React from 'react';
import { Text, View, Button } from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  useNavigationState,
  useIsFocused,
} from '@react-navigation/native';

import { styles } from '../styles/styles';

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const state = useNavigationState((state) => state);
  const index = useNavigationState((state) => state.index);
  const isFocused = useIsFocused();

  // console.log(state);
  // console.log(`Screen index: ${index}`);
  // console.log(`Is focused? ${isFocused}`);

  useFocusEffect(
    React.useCallback(() => {
      fetch('https://restcountries.eu/rest/v2/capital/tallinn').then(
        (response) => {
          response.json().then((data) => {
            // console.log(data);
          });
        }
      );
      return () => console.log('lost focus');
    })
  );

  return (
    <View style={styles.center}>
      <Text style={styles.title}>{route.params.screenName}</Text>
      <Button
        title="Pass Data Back"
        onPress={() =>
          navigation.navigate('MessagesScreen', {
            data: 'param back',
          })
        }
      />
    </View>
  );
};

export default ChatScreen;
