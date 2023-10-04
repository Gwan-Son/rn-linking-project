import React from 'react';
import {View, Text, Button} from 'react-native';

function Message({navigation}) {
  return (
    <View>
      <Text>Message !</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Message;
