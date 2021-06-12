import React from 'react';
import { Dimensions } from 'react-native';

import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins';

import styled, { css } from 'styled-components';

let width = Dimensions.get('window').width;

const HeaderWrapper = styled.View`
  position: relative;
  flex-direction: row;
  background-color: #b6defd;
  width: ${width};
  padding: 0;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;

  ${Platform.select({
    ios: css`
      margin-left: 0;
      height: 90px;
    `,
    android: css`
      margin-left: -16px;
      height: 114px;
    `,
  })};
`;

const Title = styled.Text`
  position: absolute;
  left: 15px;
  font-size: 30px;
  color: #5603ad;

  ${Platform.select({
    ios: css`
      bottom: 13px;
    `,
    android: css`
      bottom: 10px;
    `,
  })};
`;

export const ImagesWrapper = styled.View`
  position: absolute;
  flex-direction: row;
  right: 15px;

  ${Platform.select({
    ios: css`
      bottom: 15px;
    `,
    android: css`
      bottom: 20px;
    `,
  })};
`;

export const Img = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-left: 5px;
`;

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
