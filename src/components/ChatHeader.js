import React from 'react';

import { useRoute, useNavigation } from '@react-navigation/native';

import { Dimensions } from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import StyleSheet from 'react-native-media-query';

import {
  HeaderWrapper,
  ArrowTouch,
  RoomPicWrapper,
  RoomName,
  ImagesWrapper,
  Img,
} from '../styles/ChatHeaderStyles';

const RoomsHeader = () => {
  const route = useRoute();
  const navigation = useNavigation();

  let roomPic = route.params.roomPic;
  let roomName = route.params.roomName;

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
  });

  let width = Dimensions.get('window').width;

  const { ids, styles } = StyleSheet.create({
    roomName: {
      fontFamily: 'Poppins_600SemiBold',
      width: width * 0.4,
      '@media (min-width: 500px)': {
        width: width * 0.6,
      },
      '@media (max-width: 320px)': {
        width: width * 0.3,
      },
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <HeaderWrapper>
        <ArrowTouch onPress={() => navigation.navigate('Rooms')}>
          <FontAwesome name="angle-left" size={45} color="#5603ad" />
        </ArrowTouch>
        <RoomPicWrapper>
          <Img
            source={
              roomPic !== ''
                ? {
                    uri: roomPic,
                  }
                : require('../assets/profile.jpg')
            }
          />
        </RoomPicWrapper>
        <RoomName
          style={styles.roomName}
          dataSet={{ media: ids.roomName }}
          numberOfLines={1}
        >
          {roomName}
        </RoomName>
        <ImagesWrapper>
          <Img source={require('../assets/search.jpg')} />
          <Img source={require('../assets/rooms.jpg')} />
        </ImagesWrapper>
      </HeaderWrapper>
    );
};

export default RoomsHeader;
