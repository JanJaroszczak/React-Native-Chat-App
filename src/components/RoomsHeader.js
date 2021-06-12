import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

import {
  HeaderWrapper,
  Title,
  ImagesWrapper,
  Img,
} from '../styles/RoomsHeaderStyles';

const RoomsHeader = () => {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <HeaderWrapper>
        <Title style={{ fontFamily: 'Poppins_700Bold' }}>Rooms</Title>
        <ImagesWrapper>
          <Img source={require('../assets/search.jpg')} />
          <Img source={require('../assets/rooms.jpg')} />
        </ImagesWrapper>
      </HeaderWrapper>
    );
};

export default RoomsHeader;
