import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Contacts from 'react-native-contacts';
import CustomAlert from './CustomAlert';

function UpdateContact({route, navigation}: any) {
  const {contact} = route.params;
  const [name, setName] = useState(contact.givenName);
  const [isAlertVisible1, setAlertVisible1] = useState(false);
  const [isAlertVisible2, setAlertVisible2] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    contact.phoneNumbers && contact.phoneNumbers.length > 0
      ? contact.phoneNumbers[0].number
      : '',
  );

  const phoneNumberRegex = /^[0-9\b -]{0,13}$/; // 10자리 숫자만 허용하는 정규식

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

  const handleUpdateContact = () => {
    if (
      !name ||
      !phoneNumber ||
      !phoneNumberRegex.test(phoneNumber) ||
      phoneNumber.length < 3
    ) {
      // 이름이나 전화번호가 비어있거나 정규식과 매치되지 않으면
      setAlertVisible1(true); // CustomAlert를 보여줍니다.
    } else {
      var updateToContact = contact;
      updateToContact.phoneNumbers[0].number = phoneNumber;
      updateToContact.givenName = name;
      Contacts.updateContact(updateToContact).then(() => {
        setAlertVisible2(true);
      });
    }
  };

  const closeAlert = () => {
    setAlertVisible1(false);
  };

  const confirmAlert = () => {
    navigation.navigate('Contact');
    setAlertVisible2(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.label}>전화번호</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        keyboardType="number-pad"
        placeholder="전화번호를 입력하세요"
        onChangeText={text => setPhoneNumber(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateContact}>
        <Text style={styles.buttonText}>연락처 수정</Text>
      </TouchableOpacity>
      <CustomAlert
        visible={isAlertVisible1}
        message="이름과 전화번호를 올바르게 입력해주세요."
        onClose={closeAlert}
      />
      <CustomAlert
        visible={isAlertVisible2}
        message="연락처 수정이 완료되었습니다."
        onClose={confirmAlert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UpdateContact;
