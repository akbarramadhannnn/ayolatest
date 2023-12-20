import {memo, useMemo} from 'react';
import {moderateScale, verticalScale} from '@utils/responsive';
import theme from '@constants/theme';
import {Text, TouchableOpacity} from 'react-native';

const Index = ({onPress = () => {}, children, disabled = false}) => {
  const customStyle = useMemo(() => {
    const style = {
      button: {
        backgroundColor: theme.blue2,
        borderRadius: moderateScale(25),
        justifyContent: 'center',
        alignItems: 'center',
        height: verticalScale(46),
      },
      text: {
        color: theme.white1,
        fontSize: moderateScale(16),
        fontWeight: '500',
      },
    };

    if (disabled) {
      style.button.backgroundColor = theme.gray2;
      style.text.color = theme.gray1;
    }
    return style;
  }, [disabled]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={customStyle.button}
      disabled={disabled}>
      <Text style={customStyle.text}>{children}</Text>
    </TouchableOpacity>
  );
};

export default memo(Index);
