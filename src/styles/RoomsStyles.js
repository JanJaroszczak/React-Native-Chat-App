import styled, { css } from 'styled-components';
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
  background-color: #ffffff;

  ${Platform.select({
    ios: css`
      padding-left: 0;
      padding-right: 0;
    `,
    android: css`
      padding-left: 10px;
      padding-right: 10px;
    `,
  })};
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const UserImgWrapper = styled.View`
  padding-top: 15px;
  padding-bottom: 15px;
`;

export const UserImg = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  padding-left: 0;
  margin-left: 10px;
  width: 250px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  ${Platform.select({
    android: css`
      padding-right: 15px;
    `,
  })};
`;

export const UserName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  /* font-family: 'Lato-Regular'; */
`;

export const PostTime = styled.Text`
  font-size: 12px;
  color: #666;
  /* font-family: 'Lato-Regular'; */
`;

export const MessageText = styled.Text`
  font-size: 14px;
  color: #333333;
`;
