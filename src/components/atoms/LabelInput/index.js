import {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import GlobalStyles from '@constants/styles';
import theme from '@constants/theme';

const Index = ({children}) => {
  return <Text style={[styles.text, GlobalStyles.fontSize14]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: theme.black1,
    fontWeight: '500',
  },
});

export default memo(Index);
