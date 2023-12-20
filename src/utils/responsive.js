import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal, likewise
const horizontalScale = size => (width / guidelineBaseWidth) * size;

// height, marginTop, marginBottom, marginVertical, line-height, paddingTop, paddingBottom, paddingVertical, likewies
const verticalScale = size => (height / guidelineBaseHeight) * size;

// fontSize, borderRadius, lilewise
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};
