import styled, { css } from 'styled-components';

import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width;

export const HeaderWrapper = styled.View`
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
      margin-left: -72px;
      height: 114px;
    `,
  })};
`;

export const ArrowTouch = styled.TouchableOpacity`
  position: absolute;
  left: 15px;

  ${Platform.select({
    ios: css`
      top: 30px;
    `,
    android: css`
      top: 50px;
    `,
  })};
`;

export const RoomPicWrapper = styled.View`
  position: absolute;
  left: 43px;

  ${Platform.select({
    ios: css`
      bottom: 15px;
    `,
    android: css`
      bottom: 20px;
    `,
  })};
`;

export const RoomName = styled.Text`
  position: absolute;
  left: 105px;
  font-size: 15px;
  color: #5603ad;

  ${Platform.select({
    ios: css`
      bottom: 23px;
    `,
    android: css`
      bottom: 29px;
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
