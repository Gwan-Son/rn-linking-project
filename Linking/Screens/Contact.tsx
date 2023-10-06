import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Contacts from 'react-native-contacts';
import AddContactModal from './Components/AddContact';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

type ContactProps = {
  navigation: any;
};

function Contact({navigation}: ContactProps) {
  const [contacts, setContacts] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadContacts(); // 연락처 가져오기
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        setContacts(contacts); // 연락처 정보 설정
      })
      .catch(err => {
        console.warn(err);
      });
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => {
        // 연락처를 클릭할 때의 동작을 여기에 구현
        // 예: navigation.navigate('ContactDetail', { contact: item });
      }}>
      <Text style={styles.contactName}>{item.givenName}</Text>
      {item.phoneNumbers &&
        item.phoneNumbers.map(phoneNumber => (
          <Text key={phoneNumber.id} style={styles.phoneNumber}>
            {phoneNumber.number}
          </Text>
        ))}
      <View style={styles.separator} />
    </TouchableOpacity>
  );

  const handleCloseModal = () => {
    loadContacts(); // 모달이 닫힐 때 연락처를 다시 불러옴
    setModalVisible(false); // 모달을 닫음
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>연락처</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>연락처 추가</Text>
      </TouchableOpacity>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.recordID.toString()}
        style={styles.flatList}
      />

      {/* 이전에 구현했던 스크롤뷰를 사용한 연락처 */}
      {/* <ScrollView>
        <View style={styles.contactsContainer}>
          {contacts.map(contact => (
            <View key={contact.recordID}>
              <Text style={styles.contactName}>{contact.givenName}</Text>
              {contact.phoneNumbers &&
                contact.phoneNumbers.map(phoneNumber => (
                  <Text key={phoneNumber.id} style={styles.phoneNumber}>
                    {phoneNumber.number}
                  </Text>
                ))}
              <View style={styles.separator} />
            </View>
          ))}
        </View>
      </ScrollView> */}
      <AddContactModal visible={isModalVisible} onClose={handleCloseModal} />
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
  contactsContainer: {
    marginTop: 20,
  },
  contactItem: {
    marginBottom: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  flatList: {
    flex: 1,
    width: '80%',
  },
});

export default Contact;
