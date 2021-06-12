import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';

const Chat = ({
  subscribeToNewRoomMessages,
  data,
  currentUserQuery,
  onSend,
}) => {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
  });

  useEffect(() => {
    subscribeToNewRoomMessages();
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            padding: 7,
            paddingTop: 9,
            paddingRight: 20,
            backgroundColor: '#5603ad',
            borderRadius: 15,
            borderBottomRightRadius: 0,
          },
          left: {
            backgroundColor: '#fff',
            padding: 7,
            paddingTop: 9,
            paddingLeft: 20,
            borderRadius: 15,
            borderBottomLeftRadius: 0,
          },
        }}
        textStyle={{
          right: {
            fontFamily: 'Poppins_400Regular',
            color: '#fff',
          },
          left: {
            fontFamily: 'Poppins_400Regular',
            color: '#000',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <View
        style={{
          backgroundColor: '#f0f8ff',
          flex: 1,
          paddingLeft: 15,
          paddingRight: 15,
          fontFamily: 'Poppins_300Light',
        }}
      >
        <GiftedChat
          messages={data.room.messages
            .slice(0)
            .reverse()
            .map(({ id, body, insertedAt, user }) => {
              return {
                _id: id,
                text: body,
                createdAt: Date.parse(insertedAt),
                user: {
                  _id: user.id,
                  name: user.firstName,
                  avatar: null,
                },
              };
            })}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: currentUserQuery.data.user.id,
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
          alwaysShowSend
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
        />
      </View>
    );
};

export default Chat;

// const navigation = useNavigation();
// const route = useRoute();
// const state = useNavigationState((state) => state);
// const index = useNavigationState((state) => state.index);
// const isFocused = useIsFocused();

// console.log(state);
// console.log(`Screen index: ${index}`);
// console.log(`Is focused? ${isFocused}`);

// useFocusEffect(
//   React.useCallback(() => {
//     fetch('https://restcountries.eu/rest/v2/capital/tallinn').then(
//       (response) => {
//         response.json().then((data) => {
//           // console.log(data);
//         });
//       }
//     );
//     return () => console.log('lost focus');
//   })
// );

//  return (
//    <View style={styles.container}>
//      <Text style={styles.title}>{route.params.screenName}</Text>
//      <Button
//        title="Pass Data Back"
//        onPress={() =>
//          navigation.navigate('Messages', {
//            data: 'param back',
//          })
//        }
//      />
//    </View>
//  );
