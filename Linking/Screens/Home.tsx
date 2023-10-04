import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Home({navigation}) {
  return (
    <View style={Styles.container}>
      <Text>Home !</Text>
      <Button title="Go to Call" onPress={() => navigation.navigate('Call')} />
      <Button
        title="Go to Message"
        onPress={() => navigation.navigate('Message')}
      />
      <Button
        title="Go to Conatact"
        onPress={() => navigation.navigate('Contact')}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  buttons: {
    height: 55,
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Home;
