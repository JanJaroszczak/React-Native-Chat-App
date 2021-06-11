import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import { styles } from './styles/styles';

const Detail = (props) => {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>{props.route.params.screenName}</Text>
      <Button
        title="Pass Data Back"
        onPress={() =>
          props.navigation.navigate('Feed', {
            data: 'param back',
          })
        }
      />
    </View>
  );
};

export default Detail;
