import styled, { css } from 'styled-components';
import { Dimensions } from 'react-native';

let width = Dimensions.get('window').width;

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
`;

export const PostTime = styled.Text`
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: 10px;
  color: #c3c5cf;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  height: 100px;
  align-items: center;
`;

export const UserImgWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 95px;
`;

export const UserImg = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const TextSection = styled.View`
  flex-direction: column;
  width: ${width - 97};
`;

export const UserInfoText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 8px 2px 0;
`;

export const UserName = styled.Text`
  font-size: 15px;
`;

export const MessageText = styled.Text`
  padding: 2px 8px 2px 0;
  font-size: 13px;
  color: #333333;
`;
