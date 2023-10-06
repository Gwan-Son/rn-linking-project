import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import CustomAlert from './Components/CustomAlert';

type CallProps = {
  navigation: any;
};

function Call({navigation}: CallProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);

  const phoneNumberRegex = /^[0-9\b -]{0,13}$/; // 10자리 숫자만 허용하는 정규식

  const makeCall = () => {
    if (
      phoneNumber != '' &&
      phoneNumber.length > 0 &&
      phoneNumberRegex.test(phoneNumber) &&
      phoneNumber.length >= 3
    ) {
      if (Platform.OS === 'android') {
        Linking.openURL(`tel:${phoneNumber}`);
      } else {
        // iOS에서 전화 걸기
        Linking.openURL(`tel://${phoneNumber}`);
      }
    } else {
      // 전화번호가 비어있을 때 모달을 엽니다.
      setAlertVisible(true);
    }
  };

  const closeAlert = () => {
    // 모달을 닫습니다.
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>전화</Text>
      <TextInput
        style={styles.textIn}
        keyboardType="number-pad"
        onChangeText={text => setPhoneNumber(text)}
        placeholder="전화번호를 입력하세요"
      />
      <TouchableOpacity style={styles.button} onPress={makeCall}>
        <Text style={styles.buttonText}>전화 걸기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>연락처 가져오기인데 아직 안함</Text>
      </TouchableOpacity>
      <CustomAlert
        visible={isAlertVisible}
        message="전화번호를 입력해주세요."
        onClose={closeAlert}
      />
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
  },
  textIn: {
    width: '80%',
    height: 80,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 24,
    backgroundColor: '#f9f9f9',
  },
});

export default Call;
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
