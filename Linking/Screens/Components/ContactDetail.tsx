import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import DeleteContact from './DeleteContact';
import Contacts from 'react-native-contacts';

function ContactDetail({route, navigation}: any) {
  const {contact} = route.params;
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleDeleteContact = () => {
    setAlertVisible(true);
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  const makeCall = () => {
    //map을 이용해서 contact object를 사용함
    const data = contact.phoneNumbers;
    const numbers = data.map(item => item.number);
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${numbers}`);
    } else {
      // iOS에서 전화 걸기
      Linking.openURL(`tel://${numbers}`);
    }
  };

  const handleConfirm = () => {
    Contacts.deleteContact(contact).then(recordId => {
      if (recordId) {
        Alert.alert('연락처가 삭제되었습니다.');
        navigation.navigate('Contact');
      } else {
        Alert.alert('연락처 삭제에 실패했습니다.');
      }
      closeAlert();
    });
  };

  const handleUpdate = () => {
    navigation.navigate('UpdateContact', {contact: contact});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{contact.givenName}</Text>
      {contact.phoneNumbers &&
        contact.phoneNumbers.map(phoneNumber => (
          <Text key={phoneNumber.id} style={styles.phoneNumber}>
            {phoneNumber.number}
          </Text>
        ))}
      <TouchableOpacity style={styles.button} onPress={makeCall}>
        <Text style={styles.buttonText}>전화걸기</Text>
      </TouchableOpacity>
      {/* 연락처 수정 버튼 만들어야함 - 23.10.11*/}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>연락처 수정</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeleteContact}>
        <Text style={styles.buttonText}>삭제</Text>
      </TouchableOpacity>
      <DeleteContact
        visible={isAlertVisible}
        message="연락처를 삭제하시겠습니까?"
        onClose={closeAlert}
        handleConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#000',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phoneNumber: {
    color: '#000',
    fontSize: 24,
    marginBottom: 10,
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
});

export default ContactDetail;
