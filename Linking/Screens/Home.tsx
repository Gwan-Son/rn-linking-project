import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

type HomeProps = {
  navigation: any;
};

function Home({navigation}: HomeProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Call')}>
        <Text style={styles.buttonText}>전화</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Message')}>
        <Text style={styles.buttonText}>메시지</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Contact')}>
        <Text style={styles.buttonText}>연락처</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // 배경색상 추가
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333', // 글자색상 추가
  },
  button: {
    width: 125,
    backgroundColor: '#3498db', // 버튼 배경색상 추가
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff', // 버튼 글자색상 추가
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
