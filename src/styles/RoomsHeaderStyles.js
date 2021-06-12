import styled, { css } from 'styled-components';
import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width;

export const HeaderWrapper = styled.View`
  position: relative;
  flex-direction: row;
  width: ${width};
  padding: 0;
  background-color: #b6defd;
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

export const Title = styled.Text`
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
