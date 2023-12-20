import {memo} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import GlobalStyles from '@constants/styles';
import theme from '@constants/theme';
import {moderateScale, verticalScale} from '@utils/responsive';
import {Icon} from '@components/atoms';

const Index = ({
  value = '',
  onChangeText = () => {},
  placeholder = '',
  secureTextEntry = false,
  iconRightName,
  onPressRight = () => {},
}) => {
  return (
    <View
      style={[
        GlobalStyles.rowAlignCenter,
        GlobalStyles.paddingHorizontal16,
        styles.wrapper,
      ]}>
      <View style={[GlobalStyles.flex1]}>
        <TextInput
          value={value}
          onChangeText={text => onChangeText(text)}
          style={[styles.textInput, GlobalStyles.fontSize14]}
          placeholder={placeholder}
          placeholderTextColor={theme.gray1}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
      </View>

      {iconRightName ? (
        <TouchableOpacity
          style={[GlobalStyles.marginLeft8]}
          activeOpacity={0.7}
          onPress={onPressRight}>
          <Icon name={iconRightName} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    height: verticalScale(46),
    borderRadius: moderateScale(25),
    borderColor: theme.blue1,
  },
  textInput: {
    padding: 0,
    width: '100%',
    height: '100%',
    color: theme.black1,
  },
});

export default memo(Index);
