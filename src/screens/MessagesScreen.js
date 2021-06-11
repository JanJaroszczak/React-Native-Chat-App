import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from '../styles/styles';

const MessagesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  let detailResult = route.params;

  return (
    <View style={styles.center}>
      <Text style={styles.title}>
        {detailResult ? detailResult.data : 'Navigation Drawer'}
      </Text>
      <Button
        title="Go to Chat Screen"
        onPress={() =>
          navigation.navigate('ChatScreen', {
            screenName: 'My Chat Screen',
          })
        }
      />
    </View>
  );
};

export default MessagesScreen;
