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

  console.log(roomMessagesQueryResult.data);

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
                <UserName>{name}</UserName>
                <PostTime>
                  {roomMessagesQueryResult.data.room.messages[
                    roomMessagesQueryResult.data.room.messages.length - 1
                  ].insertedAt.substr(11)}
                </PostTime>
              </UserInfoText>
              <MessageText>
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
