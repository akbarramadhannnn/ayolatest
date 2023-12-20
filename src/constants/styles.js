import {StyleSheet} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '@utils/responsive';

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  paddingHorizontal20: {
    paddingHorizontal: horizontalScale(20),
  },
  paddingHorizontal16: {
    paddingHorizontal: horizontalScale(16),
  },
  marginTop8: {
    marginTop: verticalScale(8),
  },
  marginTop120: {
    marginTop: verticalScale(120),
  },
  marginBottom8: {
    marginBottom: verticalScale(8),
  },
  marginBottom20: {
    marginBottom: verticalScale(20),
  },
  marginRight8: {
    marginRight: verticalScale(8),
  },
  marginLeft8: {
    marginLeft: verticalScale(8),
  },
  fontSize14: {
    fontSize: moderateScale(14),
  },
  rowAlignContentCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowAlignCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenterBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alignContentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
