import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';

const Chat = ({
  subscribeToNewRoomMessages,
  data,
  currentUserQuery,
  onSend,
}) => {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
  });

  useEffect(() => {
    subscribeToNewRoomMessages();
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 30, paddingBottom: 4 }}>
          <Image
            source={require('../assets/send.png')}
            style={{ width: 37, height: 37 }}
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
            padding: 7,
            paddingTop: 9,
            paddingRight: 20,
            backgroundColor: '#5603ad',
            borderRadius: 15,
            borderBottomRightRadius: 0,
          },
          left: {
            backgroundColor: '#fff',
            padding: 7,
            paddingTop: 9,
            paddingLeft: 20,
            borderRadius: 15,
            borderBottomLeftRadius: 0,
          },
        }}
        textStyle={{
          right: {
            fontFamily: 'Poppins_400Regular',
            color: '#fff',
          },
          left: {
            fontFamily: 'Poppins_400Regular',
            color: '#000',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          marginLeft: -15,
          paddingLeft: 20,
          marginRight: -15,
          paddingLeft: 20,
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <View
        style={{
          backgroundColor: '#f0f8ff',
          flex: 1,
          paddingLeft: 15,
          paddingRight: 15,
          fontFamily: 'Poppins_300Light',
        }}
      >
        <GiftedChat
          messages={data.room.messages
            .slice(0)
            .reverse()
            .map(({ id, body, insertedAt, user }) => {
              return {
                _id: id,
                text: body,
                createdAt: Date.parse(insertedAt),
                user: {
                  _id: user.id,
                  name: user.firstName,
                  avatar: null,
                },
              };
            })}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: currentUserQuery.data.user.id,
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          alwaysShowSend
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
        />
      </View>
    );
};

export default Chat;
