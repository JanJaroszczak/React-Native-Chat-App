import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/client';

import Room from '../components/Room';

import { GET_ROOMS } from '../helpers/graphqlHelpers';

import { Container } from '../styles/RoomsStyles';

const RoomsScreen = () => {
  const roomsQueryResult = useQuery(GET_ROOMS);

  return (
    <Container>
      {roomsQueryResult.data && (
        <FlatList
          data={roomsQueryResult.data.usersRooms.rooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Room {...item} />}
        />
      )}
    </Container>
  );
};

export default RoomsScreen;
