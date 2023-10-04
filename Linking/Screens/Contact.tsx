import React from 'react';
import {View, Text, Button} from 'react-native';

function Contact({navigation}) {
  return (
    <View>
      <Text>Contact !</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default Contact;
