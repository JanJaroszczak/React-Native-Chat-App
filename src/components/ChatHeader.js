import React from 'react';

import { useRoute } from '@react-navigation/native';

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  HeaderWrapper,
  RoomPicWrapper,
  RoomName,
  ImagesWrapper,
  Img,
} from '../styles/ChatHeaderStyles';

const RoomsHeader = () => {
  const route = useRoute();

  let roomPic = route.params.roomPic;

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <HeaderWrapper>
        <RoomPicWrapper>
          <Img
            source={
              roomPic
                ? {
                    uri: roomPic,
                  }
                : require('../assets/profile.jpg')
            }
          />
        </RoomPicWrapper>
        <RoomName
          style={{ fontFamily: 'Poppins_600SemiBold' }}
          numberOfLines={1}
        >
          Roomssdsdsds sdsds sdsdsd sdsdsd
        </RoomName>
        <ImagesWrapper>
          <Img source={require('../assets/search.jpg')} />
          <Img source={require('../assets/rooms.jpg')} />
        </ImagesWrapper>
      </HeaderWrapper>
    );
};

export default RoomsHeader;

/* const styles = StyleSheet.create({
  container: {
    backgroundColor: '#b6defd',
    width: width,
    height: '100%',
    padding: 0,
    marginLeft: -16,
  },
  line1: {
  backgroundColor: '#b6defd',
  width: width,
  },
}); */
