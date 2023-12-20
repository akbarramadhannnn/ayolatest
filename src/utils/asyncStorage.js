import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA, SIGNIN_DATA} from '@constants/asyncStorage';

export const getUserData = async () => {
  const data = await AsyncStorage.getItem(USER_DATA);
  return JSON.parse(data) || [];
};

export const storeUserData = async data => {
  let userData = await getUserData();
  if (userData === null) {
    userData = [];
  }
  userData.push(data);
  await AsyncStorage.setItem(USER_DATA, JSON.stringify(userData));
};

export const getLoginData = async () => {
  const data = await AsyncStorage.getItem(SIGNIN_DATA);
  return JSON.parse(data);
};

export const storeLoginData = async data => {
  await AsyncStorage.setItem(SIGNIN_DATA, JSON.stringify(data));
};

export const removeLoginData = async () => {
  await AsyncStorage.removeItem(SIGNIN_DATA);
};
