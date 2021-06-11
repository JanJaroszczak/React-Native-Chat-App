import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import { styles } from './styles/styles';

class Feed extends Component {
  render() {
    // console.log(this.props.route.params.data);
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Navigation Drawer</Text>
        {/* <Text style={styles.title}>{this.props.route.params.data}</Text> */}
        <Button
          title="Go to Feed Item"
          onPress={() =>
            this.props.navigation.navigate('Detail', {
              screenName: 'My Detail Screen',
            })
          }
        />
      </View>
    );
  }
}

export default Feed;
