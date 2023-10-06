import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Contacts from 'react-native-contacts';
import CustomAlert from './CustomAlert';

interface AddContactProps {
  visible: boolean;
  onClose: () => void;
}

const AddContactModal = ({visible, onClose}: AddContactProps) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (phoneNumber.length == 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNumber.length == 13) {
      setPhoneNumber(
        phoneNumber
          .replace(/-/g, '')
          .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
      );
    }
  }, [phoneNumber]);

  const phoneNumberRegex = /^[0-9\b -]{0,13}$/; // 10자리 숫자만 허용하는 정규식

  const handleSaveContact = () => {
    if (
      !name ||
      !phoneNumber ||
      !phoneNumberRegex.test(phoneNumber) ||
      phoneNumber.length < 3
    ) {
      // 이름이나 전화번호가 비어있거나 정규식과 매치되지 않으면
      setAlertVisible(true); // CustomAlert를 보여줍니다.
    } else {
      // 이름과 전화번호가 유효한 경우 연락처를 저장합니다.
      var newPerson = {
        givenName: name,
        phoneNumbers: [
          {
            label: 'mobile',
            number: phoneNumber,
          },
        ],
      };
      Contacts.addContact(newPerson);
      setPhoneNumber('');
      setName('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSaveContact}>
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#db3434'}]}
            onPress={onClose}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomAlert
        visible={isAlertVisible}
        message="이름과 전화번호를 올바르게 입력해주세요."
        onClose={() => setAlertVisible(false)}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    height: 60,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 24,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddContactModal;
