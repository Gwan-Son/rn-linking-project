import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
  NativeModules,
  PermissionsAndroid,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

const {SMSReader} = NativeModules;

type MessageProps = {
  navigation: NavigationProp<ParamListBase>;
};

// 사용자 권한을 받고 SMS 읽어오기
async function readSMS() {
  try {
    const smsMessages = await SMSReader.readSMS();
    console.log('SMS Messages: ', smsMessages);
  } catch (error) {
    console.error('Error reading SMS: ', error);
  }
}

// 권한 요청 및 SMS 읽기 실행
async function requestAndReadSMS() {
  try {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS);
    readSMS();
  } catch (error) {
    console.error('Error requesting SMS permission: ', error);
  }
}

function Message({navigation}: MessageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>메시지</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>홈으로</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(`sms:01000000000`)}>
        <Text style={styles.buttonText}>문자보내기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    width: 125,
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Message;
