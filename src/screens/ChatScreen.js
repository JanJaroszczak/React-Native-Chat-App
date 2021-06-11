import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  useNavigationState,
  useIsFocused,
} from '@react-navigation/native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const navigation = useNavigation();
// const route = useRoute();
// const state = useNavigationState((state) => state);
// const index = useNavigationState((state) => state.index);
// const isFocused = useIsFocused();

// console.log(state);
// console.log(`Screen index: ${index}`);
// console.log(`Is focused? ${isFocused}`);

// useFocusEffect(
//   React.useCallback(() => {
//     fetch('https://restcountries.eu/rest/v2/capital/tallinn').then(
//       (response) => {
//         response.json().then((data) => {
//           // console.log(data);
//         });
//       }
//     );
//     return () => console.log('lost focus');
//   })
// );

//  return (
//    <View style={styles.container}>
//      <Text style={styles.title}>{route.params.screenName}</Text>
//      <Button
//        title="Pass Data Back"
//        onPress={() =>
//          navigation.navigate('Messages', {
//            data: 'param back',
//          })
//        }
//      />
//    </View>
//  );
