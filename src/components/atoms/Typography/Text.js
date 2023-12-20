import {memo, useMemo} from 'react';
import {Text} from 'react-native';
import theme from '@constants/theme';

const TypographyText = ({children, color}) => {
  const textStyle = useMemo(() => {
    let style = {
      color: color ? color : theme.black1,
    };

    return style;
  }, [color]);

  return <Text style={textStyle}>{children}</Text>;
};

export default memo(TypographyText);
