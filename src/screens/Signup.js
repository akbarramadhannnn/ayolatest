import React, {useCallback, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {View} from 'react-native';
import {
  Button,
  TextInput,
  LabelInput,
  Icon,
  Typography,
} from '@components/atoms';
import GlobalStyles from '@constants/styles';
import {
  RegexMin8Char,
  RegexLowercase,
  RegexSpecialChar,
  RegexUppercase,
  RegexEmail,
} from '@utils/regex';
import routes from '@constants/routes';
import {getUserData} from '@utils/asyncStorage';
import theme from '@constants/theme';

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

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

  const goToSignIn = useCallback(() => {
    navigation.navigate(routes.Signin);
  }, [navigation]);

  const onShowPassword = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const goToOtp = useCallback(async () => {
    const userData = await getUserData();

    const filterUser = userData.filter(d => d.email === email);

    if (filterUser.length) {
      setErrorMessage('Email is registered');
    } else {
      navigation.navigate(routes.Otp, {
        email,
        password,
      });
    }
  }, [navigation, email, password]);

  const isCheckPassword8Char = useMemo(
    () => RegexMin8Char(password),
    [password],
  );

  const isCheckPasswordLowercase = useMemo(
    () => RegexLowercase(password),
    [password],
  );

  const isCheckPasswordUppercase = useMemo(
    () => RegexUppercase(password),
    [password],
  );

  const isCheckPasswordSpecialChar = useMemo(
    () => RegexSpecialChar(password),
    [password],
  );

  const isCheckEmail = useMemo(() => RegexEmail(email), [email]);

  const isAllCheckValidation = useMemo(() => {
    return (
      isCheckEmail &&
      isCheckPassword8Char &&
      isCheckPasswordLowercase &&
      isCheckPasswordUppercase &&
      isCheckPasswordSpecialChar
    );
  }, [
    isCheckEmail,
    isCheckPassword8Char,
    isCheckPasswordLowercase,
    isCheckPasswordUppercase,
    isCheckPasswordSpecialChar,
  ]);

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
        <View style={[GlobalStyles.rowAlignCenter, GlobalStyles.marginBottom8]}>
          <View style={[GlobalStyles.marginRight8]}>
            <Icon
              name={isCheckPassword8Char ? 'check-success' : 'check-danger'}
            />
          </View>
          <Typography.Text>
            Password must contain at least 8 characters
          </Typography.Text>
        </View>
        <View style={[GlobalStyles.rowAlignCenter, GlobalStyles.marginBottom8]}>
          <View style={[GlobalStyles.marginRight8]}>
            <Icon
              name={isCheckPasswordLowercase ? 'check-success' : 'check-danger'}
            />
          </View>
          <Typography.Text>
            Password must contain at least a lowercase letter
          </Typography.Text>
        </View>
        <View style={[GlobalStyles.rowAlignCenter, GlobalStyles.marginBottom8]}>
          <View style={[GlobalStyles.marginRight8]}>
            <Icon
              name={isCheckPasswordUppercase ? 'check-success' : 'check-danger'}
            />
          </View>
          <Typography.Text>
            Password must contain at least an uppercase letter
          </Typography.Text>
        </View>
        <View style={[GlobalStyles.rowAlignCenter, GlobalStyles.marginBottom8]}>
          <View style={[GlobalStyles.marginRight8]}>
            <Icon
              name={
                isCheckPasswordSpecialChar ? 'check-success' : 'check-danger'
              }
            />
          </View>
          <Typography.Text>
            Password must contain at least a symbol
          </Typography.Text>
        </View>
        <View style={[GlobalStyles.rowAlignCenter, GlobalStyles.marginBottom8]}>
          <View style={[GlobalStyles.marginRight8]}>
            <Icon name={isCheckEmail ? 'check-success' : 'check-danger'} />
          </View>
          <Typography.Text>Email is valid</Typography.Text>
        </View>
      </View>

      <View style={[GlobalStyles.marginBottom20]}>
        <Button disabled={!isAllCheckValidation} onPress={goToOtp}>
          Create Account
        </Button>
      </View>

      <View style={[GlobalStyles.rowAlignContentCenter]}>
        <Typography.Text>Already have an account?</Typography.Text>
        <Typography.Button onPress={goToSignIn}> Sign In</Typography.Button>
      </View>
    </View>
  );
};

export default Signup;
