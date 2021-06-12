import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useQuery, gql } from '@apollo/client';

import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/RoomsStyles';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

const GET_ROOM_MESSAGES = gql`
  query ($id: String!) {
    room(id: $id) {
      messages {
        body
        insertedAt
        user {
          firstName
        }
      }
    }
  }
`;

const SUBSCRIBE_ROOM_MESSAGES = gql`
  subscription ($roomId: String!) {
    messageAdded(roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        id
        lastName
        profilePic
        role
      }
    }
  }
`;

const Room = ({
  id,
  name,
  roomPic,
  // chooseRoom
}) => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  const navigation = useNavigation();

  const { subscribeToMore, ...roomMessagesQueryResult } = useQuery(
    GET_ROOM_MESSAGES,
    {
      variables: { id: id },
    }
  );

  const subscribeToNewRoomMessages = () => {
    subscribeToMore({
      document: SUBSCRIBE_ROOM_MESSAGES,
      variables: { roomId: id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.messageAdded;
        return Object.assign({}, prev, {
          room: {
            messages: [...prev.room.messages, newFeedItem],
          },
        });
      },
    });
  };

  useEffect(() => {
    subscribeToNewRoomMessages();
  }, []);

  // console.log(roomMessagesQueryResult.data);

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <>
        {/* <div onClick={() => chooseRoom(id)}>
        <h2>{name}</h2>
        <h4>
          {roomMessagesQueryResult.data &&
            roomMessagesQueryResult.data.room.messages[
              roomMessagesQueryResult.data.room.messages.length - 1
            ].body}
        </h4>
      </div> */}

        {roomMessagesQueryResult.data && (
          // <Card onPress={() => navigation.navigate('Chat', { chosenRoom: id })}>
          <Card onPress={() => navigation.navigate('Chat', { chosenRoom: id })}>
            <PostTime style={{ fontFamily: 'Poppins_400Regular' }}>
              {
                roomMessagesQueryResult.data.room.messages[
                  roomMessagesQueryResult.data.room.messages.length - 1
                ].insertedAt
              }
            </PostTime>
            <UserInfo>
              <UserImgWrapper>
                <UserImg
                  source={
                    roomPic
                      ? {
                          uri: roomPic,
                        }
                      : require('../assets/profile.jpg')
                  }
                />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName
                    numberOfLines={1}
                    style={{ fontFamily: 'Poppins_400Regular' }}
                  >
                    {name}
                  </UserName>
                </UserInfoText>
                <MessageText
                  numberOfLines={1}
                  style={{ fontFamily: 'Poppins_400Regular' }}
                >
                  {
                    roomMessagesQueryResult.data.room.messages[
                      roomMessagesQueryResult.data.room.messages.length - 1
                    ].body
                  }
                </MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      </>
    );
};

export default Room;
