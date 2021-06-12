import { gql } from '@apollo/client';

export const GET_ROOMS = gql`
  query {
    usersRooms {
      rooms {
        id
        name
        roomPic
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    user {
      id
    }
  }
`;

export const GET_ROOM_MESSAGES = gql`
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

export const SUBSCRIBE_ROOM_MESSAGES = gql`
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

export const SEND_MESSAGE = gql`
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
