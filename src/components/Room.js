import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';

import {
  GET_ROOM_MESSAGES,
  SUBSCRIBE_ROOM_MESSAGES,
} from '../helpers/graphqlHelpers';

import {
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

const Room = ({ id, name, roomPic }) => {
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

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <>
        {roomMessagesQueryResult.data && (
          <Card
            onPress={() =>
              navigation.navigate('Chat', {
                chosenRoom: id,
                roomPic,
                roomName: name,
              })
            }
          >
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
