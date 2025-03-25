import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { width: Width, height: Height } = Dimensions.get('window');

const isSmall = Width <= 375 && !DeviceInfo.hasNotch();

const guidelineBaseWidth = () => {
    return isSmall ? 330 : 350;
};

const guidelineBaseHeight = () => {
    if (isSmall) {
        return 550;
    } else if (Width > 410) {
        return 620;
    } else {
        return 680;
    }
};

const guidelineBaseFonts = () => {
    return Width > 410 ? 430 : 400;
};

const horizontalScale = (size) => {
    return (Width / guidelineBaseWidth()) * size;
};

const verticalScale = (size) => {
    return (Height / guidelineBaseHeight()) * size;
};

const fontScale = (size) => {
    return (Width / guidelineBaseFonts()) * size;
};

export { fontScale, horizontalScale, verticalScale };

