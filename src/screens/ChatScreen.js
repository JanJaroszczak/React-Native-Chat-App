import React from 'react';

import { useRoute } from '@react-navigation/native';

import { useQuery, useMutation, gql } from '@apollo/client';

import Chat from '../components/Chat';

const GET_CURRENT_USER = gql`
  query {
    user {
      id
    }
  }
`;

const GET_ROOM_MESSAGES = gql`
  query ($id: String!) {
    room(id: $id) {
      id
      messages {
        body
        id
        insertedAt
        user {
          firstName
          id
          profilePic
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

const SEND_MESSAGE = gql`
  mutation ($roomId: String!, $body: String!) {
    sendMessage(roomId: $roomId, body: $body) {
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

const ChatScreen = () => {
  const route = useRoute();

  let chosenRoom = route.params.chosenRoom;

  const { subscribeToMore, ...roomMessagesQueryResult } = useQuery(
    GET_ROOM_MESSAGES,
    {
      variables: { id: chosenRoom },
    }
  );

  const [sendMessage] = useMutation(SEND_MESSAGE);

  const executeMutation = (messages) => {
    if (messages[0].text.length > 0) {
      sendMessage({
        variables: {
          roomId: chosenRoom,
          body: messages[0].text,
        },
      });
    }
  };

  const currentUserQuery = useQuery(GET_CURRENT_USER);

  // console.log(currentUserQuery.data);

  // console.log(roomMessagesQueryResult.data);

  return (
    <>
      {roomMessagesQueryResult.data && currentUserQuery.data && (
        <Chat
          currentUserQuery={currentUserQuery}
          {...roomMessagesQueryResult}
          subscribeToNewRoomMessages={() => {
            subscribeToMore({
              document: SUBSCRIBE_ROOM_MESSAGES,
              variables: { roomId: chosenRoom },
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
          }}
          onSend={executeMutation}
        />
      )}
    </>
  );
};

export default ChatScreen;
