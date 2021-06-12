import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/client';

import Chat from '../components/Chat';

import {
  GET_CURRENT_USER,
  GET_ROOM_MESSAGES,
  SUBSCRIBE_ROOM_MESSAGES,
  SEND_MESSAGE,
} from '../helpers/graphqlHelpers';

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
