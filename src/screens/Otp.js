import React, {useCallback, useState, useRef, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import GlobalStyles from '@constants/styles';
import {Typography} from '@components/atoms';
import {horizontalScale, moderateScale, verticalScale} from '@utils/responsive';
import routes from '@constants/routes';
import {NUMBER_OF_INPUT, OTP_CODE} from '@constants/data';
import theme from '@constants/theme';
import useCountdown from '@hooks/useCountdown';
import {storeUserData} from '@utils/asyncStorage';

const Signup = ({navigation, route}) => {
  const {params} = route;

  const {runTimer, setRunTimer, time} = useCountdown();

  const textInputRef = useRef([]);
  const [inputOtp, setInputOtp] = useState(new Array(NUMBER_OF_INPUT).fill(''));
  const [isCheckCode, setIsCheckCode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        textInputRef.current[currentIndex].focus();
      }, 100);
    }, []),
  );

  const storeToLocal = useCallback(async data => {
    await storeUserData(data);
  }, []);

  useEffect(() => {
    if (isCheckCode) {
      setIsCheckCode(false);

      const valueOtp = inputOtp.join('');
      if (valueOtp !== OTP_CODE) {
        setErrorMessage('OTP code is invalid');
      } else {
        storeToLocal(params);
        navigation.navigate(routes.Signin);
      }
    }
  }, [isCheckCode, inputOtp, navigation, params, storeToLocal]);

  useEffect(() => {
    const inputLength = inputOtp.filter(d => d !== '').length;
    if (inputLength === NUMBER_OF_INPUT) {
      setIsCheckCode(true);
    } else {
      setErrorMessage('');
    }
  }, [inputOtp]);

  const handleOnChangeText = useCallback(
    (event, index) => {
      const {text} = event.nativeEvent;
      const state = [...inputOtp];

      if (text.length === NUMBER_OF_INPUT) {
        for (let i = 0; i < text.length; i++) {
          state[i] = text[i];
        }
      } else {
        const nextIndex = index + 1;
        const nextInput = textInputRef.current[nextIndex];
        if (text.length === 1 && index !== NUMBER_OF_INPUT - 1) {
          if (nextInput) {
            setCurrentIndex(nextIndex);
            nextInput.focus();
          }
        }
        state[index] = text;
      }
      setInputOtp(state);
    },
    [textInputRef, inputOtp],
  );

  const handleOnPressIn = useCallback(
    index => {
      setCurrentIndex(index);
    },
    [textInputRef],
  );

  const handleOnKeyPress = useCallback(
    (event, index) => {
      if (event.nativeEvent.key === 'Backspace') {
        if (index !== 0) {
          const prevIndex = index - 1;
          const previousInput = textInputRef.current[prevIndex];
          setCurrentIndex(prevIndex);
          if (previousInput) {
            previousInput.focus();
            return;
          }
        }
      }
    },
    [textInputRef],
  );

  const handleSendOtp = useCallback(() => {
    setRunTimer(true);
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.flex1]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={[GlobalStyles.flex1]}>
        <View
          style={[
            GlobalStyles.flex1,
            GlobalStyles.paddingHorizontal20,
            GlobalStyles.marginTop120,
          ]}>
          <View style={[GlobalStyles.flex1]}>
            <View style={[GlobalStyles.rowCenterBetween]}>
              {inputOtp.map((d, i) => {
                return (
                  <TextInput
                    key={i}
                    ref={el => (textInputRef.current[i] = el)}
                    style={[
                      styles.input,
                      {
                        borderColor: errorMessage
                          ? theme.red1
                          : currentIndex === i
                          ? theme.blue1
                          : d !== ''
                          ? theme.blue1
                          : theme.gray1,
                        backgroundColor: errorMessage
                          ? theme.white1
                          : currentIndex === i
                          ? theme.white1
                          : d !== ''
                          ? theme.white1
                          : theme.gray2,
                        color: errorMessage ? theme.red1 : theme.black1,
                      },
                    ]}
                    value={d}
                    maxLength={1}
                    keyboardType="numeric"
                    onChange={event => handleOnChangeText(event, i)}
                    onKeyPress={event => handleOnKeyPress(event, i)}
                    onPressIn={() => handleOnPressIn(i)}
                  />
                );
              })}
            </View>

            {errorMessage ? (
              <View
                style={[
                  GlobalStyles.marginTop8,
                  GlobalStyles.alignContentCenter,
                ]}>
                <Typography.Text color={theme.red1}>
                  {errorMessage}
                </Typography.Text>
              </View>
            ) : null}
          </View>

          <View
            style={[
              GlobalStyles.rowAlignContentCenter,
              GlobalStyles.marginBottom20,
            ]}>
            <View style={[GlobalStyles.marginRight8]}>
              <Typography.Text>
                {runTimer ? 'Kirim Ulang OTP dalam' : 'Belum menerima kode?'}
              </Typography.Text>
            </View>

            <Typography.Button onPress={handleSendOtp} disabled={runTimer}>
              {runTimer ? `${time.minutes}:${time.seconds}` : `Kirim Ulang`}
            </Typography.Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: horizontalScale(40),
    height: verticalScale(60),
    borderWidth: 1.5,
    borderRadius: moderateScale(8),
    textAlign: 'center',
    padding: 0,
    fontSize: moderateScale(20),
  },
});

export default Signup;
