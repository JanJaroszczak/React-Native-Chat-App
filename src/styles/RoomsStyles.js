import styled, { css } from 'styled-components';

import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width;

// import { AppLoading } from 'expo';
// import {
//   Lato_100Thin,
//   Lato_100Thin_Italic,
//   Lato_300Light,
//   Lato_300Light_Italic,
//   Lato_400Regular,
//   Lato_400Regular_Italic,
//   Lato_700Bold,
//   Lato_700Bold_Italic,
//   Lato_900Black,
//   Lato_900Black_Italic,
// } from '@expo-google-fonts/lato';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #f0f8ff;

  ${Platform.select({
    ios: css`
      padding-top: 35px;
    `,
    android: css`
      padding-top: 40px;
    `,
  })};
`;

export const Card = styled.TouchableOpacity`
  position: relative;
  width: ${width};
  height: 100px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border-radius: 15px;

  /* border: 1px solid black; */
`;

export const PostTime = styled.Text`
  position: absolute;
  top: 5px;
  right: 10px;
  /* align-self: flex-end; */
  font-size: 12px;
  color: #666;
  /* font-family: 'Lato-Regular'; */
`;

export const UserInfo = styled.View`
  flex-direction: row;
  height: 100px;
  /* justify-content: center; */
  align-items: center;
`;

export const UserImgWrapper = styled.View`
  /* padding-top: 15px;
  padding-bottom: 15px; */
  justify-content: center;
  align-items: center;
  width: 95px;

  /* border: 1px solid black; */
`;

export const UserImg = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  /* justify-content: center; */
  /* flex-basis: 80%; */
  width: ${width - 97};
  /* padding: 15px;
  padding-left: 0;
  margin-left: 10px; */
  /* width: 100%; */
  /* border-bottom-width: 1px; */
  /* border-bottom-color: #cccccc; */

  /* border: 1px solid black; */
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 8px 2px 0;

  /* margin-bottom: 5px; */
  /* ${Platform.select({
    android: css`
      padding-right: 15px;
    `,
  })}; */
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  /* font-family: 'Lato-Regular'; */
`;

export const MessageText = styled.Text`
  padding: 2px 8px 2px 0;
  font-size: 14px;
  color: #333333;
`;
