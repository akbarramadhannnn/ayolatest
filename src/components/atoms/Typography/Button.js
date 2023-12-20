import {memo} from 'react';
import {Text, StyleSheet} from 'react-native';
import theme from '@constants/theme';

const TypographyButton = ({onPress = () => {}, disabled = false, children}) => {
  return (
    <Text style={styles.textButton} onPress={onPress} disabled={disabled}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textButton: {
    color: theme.blue1,
    fontWeight: '700',
  },
});

export default memo(TypographyButton);
