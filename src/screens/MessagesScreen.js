import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// import { styles } from '../styles/styles';

const MessagesScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Messages Screen</Text>
      <Button title="Click Here" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// const navigation = useNavigation();
// const route = useRoute();

// let detailResult = route.params;

// return (
//   <View style={styles.center}>
//     <Text style={styles.title}>
//       {detailResult ? detailResult.data : 'Navigation Drawer'}
//     </Text>
//     <Button
//       title="Go to Chat Screen"
//       onPress={() =>
//         navigation.navigate('Chat', {
//           screenName: 'My Chat Screen',
//         })
//       }
//     />
//   </View>
// );
