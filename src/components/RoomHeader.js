import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import styled, { css } from 'styled-components';

let width = Dimensions.get('window').width;

const HeaderWrapper = styled.View`
  position: relative;
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
  left: 10px;
  bottom: 10px;
`;

const RoomHeader = () => {
  return (
    <HeaderWrapper>
      <Title>Rooms</Title>
    </HeaderWrapper>
  );
};

export default RoomHeader;

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
