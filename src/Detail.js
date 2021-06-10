import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import { styles } from './styles/styles';

const Detail = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Detail</Text>
      {/* <Button
        title="Go to Feed Item"
        onPress={() => this.props.navigation.navigate('Detail')}
      /> */}
    </View>
  );
};

export default Detail;
