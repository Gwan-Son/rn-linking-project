import React from 'react';
import {View, Text, Button} from 'react-native';

function Call({navigation}) {
  return (
    <View>
      <Text>Call !</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Call;
