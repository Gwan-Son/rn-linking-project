import 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PermissionsAndroid} from 'react-native';

import Home from './Screens/Home';
import Call from './Screens/Call';
import Message from './Screens/Message';
import Contact from './Screens/Contact';
import ContactDetail from './Screens/Components/ContactDetail';
import UpdateContact from './Screens/Components/UpdateContact';

const Stack = createStackNavigator();

const requestContactsPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        title: '연락처 권한 요청',
        message: '연락처를 가져오기 위해 권한이 필요합니다.',
        buttonNeutral: '나중에 묻지 않기',
        buttonNegative: '거부',
        buttonPositive: '허용',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('연락처 권한이 허용되었습니다.');
    } else {
      console.log('연락처 권한이 거부되었습니다.');
    }
  } catch (err) {
    console.warn(err);
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
      {
        title: '연락처 추가 권한 요청',
        message: '연락처를 추가하기 위해 권한이 필요합니다.',
        buttonNeutral: '나중에 묻지 않기',
        buttonNegative: '거부',
        buttonPositive: '허용',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('연락처 추가 권한이 허용되었습니다.');
    } else {
      console.log('연락처 추가 권한이 거부되었습니다.');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function App() {
  useEffect(() => {
    requestContactsPermission(); // 어플리케이션이 처음 로드될 때 권한 요청
  }, []); // 빈 배열을 전달하여 최초 한 번만 실행되도록 설정
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Call" component={Call} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="ContactDetail" component={ContactDetail} />
        <Stack.Screen name="UpdateContact" component={UpdateContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
