import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View} from 'react-native';
import {Button, TextInput, LabelInput, Typography} from '@components/atoms';
import GlobalStyles from '@constants/styles';
import routes from '@constants/routes';
import {getUserData, storeLoginData} from '@utils/asyncStorage';
import {RegexEmail} from '@utils/regex';
import theme from '@constants/theme';

const Signin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(false);

  useEffect(() => {
    if (email === '' || password === '') {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [email, password]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail('');
        setPassword('');
      };
    }, []),
  );

  const onChangeEmail = useCallback(value => {
    setErrorMessage('');
    setEmail(value);
  }, []);

  const onChangePassword = useCallback(value => {
    setErrorMessage('');
    setPassword(value);
  }, []);

  const goToSignUp = useCallback(() => {
    navigation.navigate(routes.Signup);
  }, [navigation]);

  const onShowPassword = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const onSignin = useCallback(async () => {
    const userData = await getUserData();

    const findUser = userData.find(d => d.email === email);

    if (findUser === undefined || findUser.password !== password) {
      setErrorMessage('email or password wrong!');
    } else {
      await storeLoginData({
        isSignin: true,
        email: findUser.email,
      });
      navigation.navigate(routes.Home);
    }
  }, [email, password, navigation]);

  const isCheckValidEmail = useMemo(() => {
    let result;
    if (email !== '') {
      result = RegexEmail(email);
    } else {
      result = true;
    }
    return result;
  }, [email]);

  return (
    <View style={[GlobalStyles.paddingHorizontal20, GlobalStyles.marginTop120]}>
      {errorMessage ? (
        <View
          style={[
            GlobalStyles.marginBottom20,
            GlobalStyles.alignContentCenter,
          ]}>
          <Typography.Text color={theme.red1}>{errorMessage}</Typography.Text>
        </View>
      ) : null}

      <View style={[GlobalStyles.marginBottom20]}>
        <View style={[GlobalStyles.marginBottom8]}>
          <LabelInput>Email :</LabelInput>
        </View>
        <TextInput
          placeholder="Enter email"
          value={email}
          onChangeText={onChangeEmail}
        />

        {!isCheckValidEmail ? (
          <View style={[GlobalStyles.marginTop8]}>
            <Typography.Text color={theme.red1}>
              Please enter a valid email
            </Typography.Text>
          </View>
        ) : null}
      </View>

      <View style={[GlobalStyles.marginBottom20]}>
        <View style={[GlobalStyles.marginBottom8]}>
          <LabelInput>Password :</LabelInput>
        </View>
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry={secureTextEntry}
          iconRightName={secureTextEntry ? 'eye-off' : 'eye'}
          onPressRight={onShowPassword}
        />
      </View>

      <View style={[GlobalStyles.marginBottom20]}>
        <Button
          onPress={onSignin}
          disabled={disabledButton || !isCheckValidEmail}>
          Sign In
        </Button>
      </View>

      <View style={[GlobalStyles.rowAlignContentCenter]}>
        <Typography.Text>Don't have an account yet?</Typography.Text>
        <Typography.Button onPress={goToSignUp}>
          {' '}
          Create Account
        </Typography.Button>
      </View>
    </View>
  );
};

export default Signin;
