import React from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
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

import Room from '../components/Room';

const GET_ROOMS = gql`
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

const RoomsScreen = () => {
  const navigation = useNavigation();

  const roomsQueryResult = useQuery(GET_ROOMS);

  // console.log(roomsQueryResult.data);

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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const navigation = useNavigation();
// const route = useRoute();

// let detailResult = route.params;

// return (
//   <View style={styles.center}>
//     <Text style={styles.title}>
//       {detailResult ? detailResult.data : 'Navigation Drawer'}
//     </Text>
//     <Button
//       title="Go to Chat Screen"
//       onPress={() =>
//         navigation.navigate('Chat', {
//           screenName: 'My Chat Screen',
//         })
//       }
//     />
//   </View>
// );
